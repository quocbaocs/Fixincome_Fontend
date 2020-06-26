import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Table_bond extends Component {
  state = {
    todos: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('https://djangoappjson.herokuapp.com/fixincome/apibond/', {
        method: 'GET',
        headers: {
          'Authorization': 'Token 	b1697d3d463739774f2fab109c334ea184152892'
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

export default Table_bond;
