import React, { Component } from 'react';
import './Fixedincome.css';
import Table_bond from './Table_bond'
import Chart_Yield from './Chart_Yield'

export default class extends Component {
  render() {
    return (

      <div>
        <br></br>
        <br></br>
        <div class='table_bond'>
          <Table_bond></Table_bond>
        </div>

        <br></br>
        <div class='chart_yield'>
          <Chart_Yield></Chart_Yield>
        </div>

      </div>
    );
  }
}

