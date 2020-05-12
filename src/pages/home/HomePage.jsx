/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import {
  MDBView, MDBMask
} from 'mdbreact';
import './HomePage.scss';


export default class extends React.Component {
  render() {
    return (
      <MDBView src="image/background-img.jpg">
        <MDBMask overlay="black-strong" className="flex-center flex-column text-white text-center">
          <h2>Financial Technology</h2>
        </MDBMask>
      </MDBView>
    );
  }
}
