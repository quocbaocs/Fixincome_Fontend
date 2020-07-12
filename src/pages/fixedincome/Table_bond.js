import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export default class extends Component {
  state = {
    todos: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/fixincome/apibond/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token 	5f0b1117c659131585446128b7e3f746de2a055a'
        }
      });
      const todos = await res.json();
      this.setState({
        todos
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <MDBTable>
        <MDBTableHead color="primary-color" textWhite>
          <tr>
            <th>Id</th>
            <th>Asset code</th>
            <th>Maturity</th>
            <th>Issuedate</th>
            <th>Couponrate</th>
            <th>Price</th>
            <th>Yield</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody textWhite>
        {this.state.todos.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.asset_code}</td>
            <td>{item.maturity}</td>
            <td>{item.issuedate}</td>
            <td>{item.couponrate}</td>
            <td>{item.price}</td>
            <td>{item.yeild}</td>
          </tr>
        ))}
        </MDBTableBody>
      </MDBTable>
    );
   
  }
}

