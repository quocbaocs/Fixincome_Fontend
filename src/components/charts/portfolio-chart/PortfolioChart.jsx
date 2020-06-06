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
          width: [2, 2, 2, 2]
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
          size: [0, 0, 0, 6]
        }
      }
    };
  }

  updateChart(csvContent) {
    const csv = parseCSV(csvContent);

    // ["w", "mean12", "std12", "mean13", "std13", "mean23", "std23"]
    const headerRow = csv[0];
    const rows = csv.slice(-1)[0];

    const k = 2;
    const Ckn = (headerRow.length - 8) / 2;
    const numAssets = giaiPTBac2(1, -1, -Ckn * k);

    const portfolioes = [];
    let counter = 1;
    for (let i = 0; i < numAssets - 1; i++) {
      for (let j = i + 1; j < numAssets; j++) {
        const mean = rows.map((row) => +row[counter]);
        const std = rows.map((row) => +row[counter + 1]);
        const serie = mean.map((m, index) => [m, std[index]]);
        portfolioes.push({
          name: `portfolio-${i + 1}${j + 1}`,
          data: serie
        });
        counter += 2;
      }
    }

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

    // Assets line
    portfolioes.push(
      { name: 'Assets', data: assets }
    );

    const frontierLine = this.buildFrontierLine(csv);
    portfolioes.push(frontierLine);

    const minStdLine = this.buildMinStdPoint(csv);
    portfolioes.push(minStdLine);

    const cmlLine = this.buildCMLLine(csv);
    portfolioes.push(cmlLine);

    this.chart.updateOptions({
      stroke: {
        curve: [...new Array(numLines + 6).fill('straight')],
        width: [...new Array(numLines).fill(2), 4, 6, 2]
      },
      markers: {
        size: [...new Array(numLines).fill(0), 6, 0, 8]
      }
    });

    this.chart.updateSeries([
      ...portfolioes
    ]);
  }

  // eslint-disable-next-line class-methods-use-this
  buildFrontierLine(csv) {
    const wArr = csv[1];
    const stdArr = csv[2];
    const meanArr = csv[3];
    const data = wArr.map((w, index) => [
      meanArr[index], stdArr[index]
    ]);
    return {
      name: 'frontier',
      data
    };
  }

  // eslint-disable-next-line class-methods-use-this
  buildMinStdPoint(csv) {
    return {
      name: 'Min Std',
      data: [[csv[8][0], csv[7][0]]]
    };
  }

  // eslint-disable-next-line class-methods-use-this
  buildCMLLine(csv) {
    const wArr = csv[1];
    const stdArr = csv[5];
    const meanArr = csv[6];
    const data = wArr.map((w, index) => [
      meanArr[index], stdArr[index]
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
