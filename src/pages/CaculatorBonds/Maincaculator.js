import React, { Component } from 'react';
import './Calulator_bond.css'
import MyForm from './Calulator_bond';
import YtmFrom from './ytmcaculator';

export default class extends Component {
  render() {
    return (
      <div id="outer">
        <br></br>
        <MyForm></MyForm>
        <br></br>
        <br></br>
        <YtmFrom></YtmFrom>
        <br></br>
      </div>
    );
  }
}

