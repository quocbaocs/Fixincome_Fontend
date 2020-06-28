/* eslint-disable camelcase */
/* eslint-disable no-loop-func */
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './PortfolioChart.css';
import parseCSV from './parseCSV';


function giaiPTBac2(a, b, c) {
  const delta = (b * b - 4 * a * c);
  if (delta === 0) {
    return -b / (2 * a);
  }
  if (delta < 0) {
    return 0;
  }
  const x1 = (-b - Math.sqrt(delta)) / (2 * a);
  const x2 = (-b + Math.sqrt(delta)) / (2 * a);
  return Math.max(x1, x2);
}

export default class extends React.Component {
  get chart() {
    return this.chartRef.current.chart;
  }

  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: 'line'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: []
        },
        xaxis: {
          tickAmount: 8,
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'xaxis-label'
          },
          labels: {
            rotate: -45,
            formatter: (val) => val && val.toFixed(2)
          },
          title: {
            text: 'expected return',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: '#fff',
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title'
            }
          }
        },
        yaxis: {
          style: {
            cssClass: 'yaxis-label'
          },
          labels: {
            formatter: (val) => val && val.toFixed(2)
          },
          title: {
            text: 'stdev',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: '#fff',
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title'
            }
          }
        },
        title: {
          text: 'Finance',
          align: 'left',
          offsetX: 14
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetX: -10,
          labels: {
            colors: '#fff',
            useSeriesColors: false
          }
        },
        tooltip: {
          // shared: true
        },
        markers: {
          size: []
        }
      }
    };
  }

  updateChart(data) {
    const {
      M, n, W, numAssets,
      corr, cov, w,
      ar_mean, ar_std,
      mean_cml, std_cml,
      mean_exp, std_exp,
      mean_mini, std_mini,
      mean_mini_std, minimum_std,
      mean_f, std_f
    } = data;

    if (!numAssets) {
      return;
    }

    const _numAssets = numAssets || n;

    const strokeCurves = [];
    const strokeWidths = [];
    const markerSizes = [];

    function pushLineStyle(curve = 'straight', width = 2, markerSize = 0) {
      strokeCurves.push(curve);
      strokeWidths.push(width);
      markerSizes.push(markerSize);
    }

    const portfolioes = [];
    for (let i = 1; i < _numAssets; i++) {
      for (let j = i + 1; j < _numAssets + 1; j++) {
        const mean = data[`mean${i}${j}`];
        const std = data[`stdev${i}${j}`];
        const serie = mean.map((m, index) => [m, std[index]]);
        portfolioes.push({
          name: `portfolio-${i}-${j}`,
          data: serie
        });
        pushLineStyle('straight', 2, 0);
      }
    }

    const connectAssetsLine = this.buildConnectAssetsLine(portfolioes);
    portfolioes.push(connectAssetsLine);
    pushLineStyle('straight', 4, 6);

    const frontierLine = this.buildFrontierLine(mean_f, std_f);
    portfolioes.push(frontierLine);
    pushLineStyle('straight', 8, 0);

    const minStdLine = this.buildMinStdPoint([mean_mini_std, minimum_std]);
    portfolioes.push(minStdLine);
    pushLineStyle('straight', 2, 6);

    const cmlLine = this.buildCMLLine(mean_cml, std_cml);
    portfolioes.push(cmlLine);
    pushLineStyle('straight', 2, 0);

    this.chart.updateOptions({
      stroke: {
        curve: strokeCurves,
        width: strokeWidths
      },
      markers: {
        size: markerSizes
      }
    });

    this.chart.updateSeries([
      ...portfolioes
    ]);
  }

  // eslint-disable-next-line class-methods-use-this
  buildConnectAssetsLine(portfolioes) {
    function sameFloat(a, b, precision = 8) {
      return Math.abs(a - b) < 10 ** -precision;
    }
    const numLines = portfolioes.length;
    const assets = [];
    for (let i = 0; i < numLines - 1; i++) {
      for (let j = i + 1; j < numLines; j++) {
        const lineA = portfolioes[i];
        const lineB = portfolioes[j];
        const intersection = lineA.data.find(
          (A) => lineB.data.find(
            (B) => sameFloat(A[0], B[0]) && sameFloat(A[1], B[1])
          )
        );
        if (intersection) {
          assets.push(intersection);
        }
      }
    }

    return { name: 'Assets', data: assets };
  }

  // eslint-disable-next-line class-methods-use-this
  buildFrontierLine(meanF, stdevF) {
    if (!meanF) {
      return {
        name: 'frontier',
        data: []
      };
    }
    const data = meanF.map((mean, index) => [
      mean, stdevF[index]
    ]);
    return {
      name: 'frontier',
      data
    };
  }

  // eslint-disable-next-line class-methods-use-this
  buildMinStdPoint(minPoint) {
    return {
      name: 'Min Std',
      data: [minPoint]
    };
  }

  // eslint-disable-next-line class-methods-use-this
  buildCMLLine(mean_cml, std_cml) {
    const data = mean_cml.map((mean, index) => [
      mean, std_cml[index]
    ]);
    return {
      name: 'CML',
      data
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          ref={this.chartRef}
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}
