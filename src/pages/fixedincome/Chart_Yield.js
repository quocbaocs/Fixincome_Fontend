import React, { Component } from 'react';
import CanvasJSReact from './chartjs/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];


class Chart_Yield extends Component {
    render() {	
		const options = {
            width:560,
            height:260,
			theme: "light2",
			title: {
				text: "Zero curve"
			},
			axisX: {
				title: "Maturity in Years",
				includeZero: false
			},
			axisY: {
				title: "Zero Rate (%)",
				includeZero: false
			},
			data: [{
				markerType: "none",
				type: "line",
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,#0.0",
				dataPoints: dataPoints
			}]
		}
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
	
	componentDidMount(){
        var chart = this.chart;
        // https://canvasjs.com/data/gallery/react/nifty-stock-price.json
		fetch('https://djangoappjson.herokuapp.com/yieldcurve/')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			for (var i = 0; i < data.length; i++) {
				dataPoints.push({
					x: data[i].number1,
					y: data[i].number2
				});
			}
			chart.render();
		});
	}
}

export default Chart_Yield;
