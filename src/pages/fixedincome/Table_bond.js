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
            <th>asset_code</th>
            <th>maturity</th>
            <th>issuedate</th>
            <th>couponrate</th>
            <th>price</th>
            <th>yeild</th>
            <th>duration</th>
            <th>convexity</th>
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
            <td>{item.duration}</td>
            <td>{item.convexity}</td>
          </tr>
        ))}
        </MDBTableBody>
      </MDBTable>
    );
   
  }
}

export default Table_bond;
