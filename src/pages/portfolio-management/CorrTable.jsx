/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  MDBTable, MDBTableHead, MDBTableBody
} from 'mdbreact';
import classnames from 'classnames';


function isValidAsset(asset) {
  return asset.mean != null && asset.stdev != null;
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnalyze = this.handleAnalyze.bind(this);
    this.state = {
      corr: props.value
    };
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState((prevState) => {
      prevState.corr[name] = value;
      return {
        corr: prevState.corr
      };
    }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name,
            value: this.state.corr
          }
        });
      }
    });
  }

  handleAnalyze() {
    if (this.props.onAnalyze) {
      this.props.onAnalyze();
    }
  }

  render() {
    const { assets } = this.props;
    const numAssets = assets.filter((asset) => isValidAsset(asset)).length;
    const { value: corr = this.state.corr } = this.props;

    return (
      <MDBTable className="corr-table rounded white">
        <MDBTableHead>
          <tr>
            <th>#</th>
            {[...new Array(numAssets)].map((key, col) => (
              <th key={col}>Corr {col + 1}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {[...new Array(numAssets)].map((keyI, row) => (
            <tr key={row}>
              <td style={{ verticalAlign: 'middle' }}>Corr {row + 1}</td>
              {[...new Array(numAssets)].map((keyJ, col) => (
                <td>
                  <div className="form-group">
                    <input
                      name={`${row + 1}-${col + 1}`}
                      type="number"
                      step="0.1"
                      value={row === col
                        ? 1
                        : (row <= col
                          ? corr[`${row + 1}-${col + 1}`]
                          : corr[`${col + 1}-${row + 1}`])}
                      onChange={this.handleInputChange}
                      disabled={row === col || row > col}
                      className={classnames(
                        'form-control', {
                          disabled: row === col || row > col
                        }
                      )}
                    />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    );
  }
}
