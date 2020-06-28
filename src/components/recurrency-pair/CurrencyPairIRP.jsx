import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <tr>
        <td>{this.currencyPairs}</td>
        <td>{this.spotRate}</td>
        <td>{this.iR}</td>
        <td>{this.iD}</td>
        <td>{this.forwardRate}</td>
      </tr>
    );
  }
}
