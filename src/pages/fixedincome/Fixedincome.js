import React, { Component } from 'react';
import './Fixedincome.css';
import Table_bond from './Table_bond'
import Chart_Yield from './Chart_Yield'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Table_bond />
        </div>

        <div>
          <Chart_Yield/>
          
        </div>
      </div>
    );
  }
}

export default App;
