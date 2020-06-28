import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import './InterestRateParityPage.scss';


const currencyInterest = [0.2, 0.08, 0.2, 0.2, 0.3, 0.0, 0.3, 0.0];
const spotRateIRP = [7.7, 0.8, 0.8, 1.53, 1.42, 1.4, 107.5, 1.63];

function InterestRateParity(spotRate, interestD, interestF) {
  const forwardRate = spotRate + ((1 + interestF) / (1 + interestD));
  return Math.round((forwardRate + Number.EPSILON) * 100) / 100;
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.fetchSpotRates = this.fetchSpotRates.bind(this);
    this.state = {
      fetchSpotRates: {
        rates: [],
        currencyPairs: [],
        settlementDate: []

      }
    };
    this.fetchSpotRates = this.fetchSpotRates.bind(this);
  }

  componentDidMount() {
    this.fetchSpotRatesInterval();
  }

  fetchSpotRatesInterval() {
    this.fetchSpotRates(() => {
      setTimeout(() => this.fetchSpotRatesInterval(), 1000);
    });
  }

  fetchSpotRates(callback) {
    axios.get('https://finsys-iuh.herokuapp.com/fx/settlement_date')
      .then(async (response) => {
        const ccrPairs = [...response.data.ccr_pair];
        const rates = await Promise.all(
          ccrPairs.map((pair) => {
            const [baseCcr, quoteCcr] = pair.split('/');
            return axios.get(`https://api.exchangeratesapi.io/latest?symbols=${quoteCcr}&base=${baseCcr}`)
              .then(({ data }) => data.rates[quoteCcr]);
          })
        );

        this.setState(({ fetchSpotRates }) => ({
          fetchSpotRates: {
            ...fetchSpotRates,
            rates,
            currencyPairs: ccrPairs,
            settlementDate: [...response.data.settlement_date]
          }
        }), callback);
      })
      .catch((error) => {
        console.log(error);
        callback();
      });
  }


  renderTable() {
    const { fetchSpotRates: { currencyPairs, rates, settlementDate } } = this.state;
    const table = [];

    for (let i = 0; i < currencyPairs.length; i++) {
      const children = [];
      children.push(<td>{currencyPairs[i]}</td>);
      children.push(<td>{settlementDate[i]}</td>);
      children.push(<td>{rates[i].toFixed(4)}</td>);
      children.push(<td>{0.1}</td>);
      children.push(<td>{currencyInterest[i]}</td>);
      children.push(<td>{InterestRateParity(spotRateIRP[i], currencyInterest[i], 0.1)}</td>);
      table.push(<tr>{children}</tr>);
    }
    return table;
  }


  render() {
    return (
      <div>
        <h1>Interest Rate Parity</h1>
        <MDBTable className="interestRate-table white">
          <MDBTableHead>
            <tr>
              <th>Currency pair</th>
              <th>Settlement Date</th>
              <th>Spot rate</th>
              <th>Interest after 1 year(Domestic  Currency)</th>
              <th>Interest after 1 year(Foreign Currency)</th>
              <th>Forward rate</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.renderTable()}
          </MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}
