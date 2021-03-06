/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import unirest from 'unirest';
import './CompanySelect.scss';


const demoOptions = [
  { value: 'microsoft', label: 'Microsoft' },
  { value: 'google', label: 'Google' },
  { value: 'apple', label: 'Apple' }
];

let cachedCompanies = [];

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: cachedCompanies
    };
  }

  componentDidMount() {
    this.fetchCompanies();
  }

  fetchCompanies() {
    if (cachedCompanies.length > 0) return;

    const req = unirest('GET', 'https://finnhub-realtime-stock-price.p.rapidapi.com/stock/symbol');

    req.query({
      exchange: 'US'
    });

    req.headers({
      'x-rapidapi-host': 'finnhub-realtime-stock-price.p.rapidapi.com',
      'x-rapidapi-key': '0a318ccda9msh792e8197f2e749ep1a08cejsn8cf53592ba40'
    });

    req.end((res) => {
      if (res.error) throw new Error(res.error);
      // console.log(res.body);
      cachedCompanies = res.body.slice(0, 10).map((symbol) => ({
        label: symbol.description,
        value: symbol.symbol
      }));
      this.setState({
        companies: cachedCompanies
      });
    });
  }

  render() {
    const { companies } = this.state;
    const { className, ...restProps } = this.props;
    // const { className, options, ...restProps } = this.props;
    return (
      <>
        <Select
          className={className}
          // options={options || demoOptions}
          options={companies}
          component={makeAnimated}
          {...restProps}
          placeholder="Select the company"
        />
      </>
    );
  }
}
