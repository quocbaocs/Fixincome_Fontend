/* eslint-disable max-len */
import React from 'react';
import ReactApexChart from 'react-apexcharts';


export default class extends React.Component {
  get chart() {
    return this.chartRef.current.chart;
  }

  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
    this.state = {
      series: [
        {
          data: []
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        stroke: {
          curve: 'straight',
          width: 3
        },
        markers: {
          size: 6
        },
        title: {
          text: 'DIVIDEND GROWTH',
          align: 'middle'
        },
        // grid: {
        //   row: {
        //     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        //     opacity: 0.5
        //   }
        // },
        xaxis: {
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Otc', 'Nov', 'Dec']
        },
        yaxis: {
          min: 0,
          labels: {
            formatter: (val) => val && val.toFixed(2)
          }
        }
      }
    };
  }


  render() {
    return (
      <div className="px-2 py-3">
        <ReactApexChart
          ref={this.chartRef}
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={700}
        />
      </div>
    );
  }
}
