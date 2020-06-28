/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Row, Col, MDBContainer, MDBNav, MDBNavItem, MDBNavLink, MDBTabContent, MDBTabPane, MDBCard, MDBBtn
} from 'mdbreact';
import superagent from 'superagent';
import unirest from 'unirest';
import PortfolioChart from '../../components/charts/portfolio-chart/PortfolioChart';
import AssetsTable from './AssetsTable';
import './PortfolioManagement.scss';
import MinMaxW from './MinMaxW';
import financeData from './data';
import CorrTable from './CorrTable';
import CompanySelect from '../../components/company-select/CompanySelect';
import DateTimePicker from '../../components/datetime-picker/DateTimePicker';


function isValidAsset(asset) {
  return asset.mean != null && asset.stdev != null;
}

/*
function computeMean(w, meanI, meanJ) {
  return w * meanI + (1 - w) * meanJ;
}

function computeStdev(w, stdevI, stdevJ, covariant) {
  const cov = stdevI * stdevJ * covariant;
  return Math.sqrt((w ** 2 * stdevI ** 2) + (2 * w * (1 - w) * cov) + ((1 - w) ** 2 * stdevJ ** 2));
}
*/
function countCombination(assets = []) {
  const numAssets = assets.length;
  let counter = 0;
  for (let i = 0; i < numAssets - 1; i++) {
    for (let j = i + 1; j < numAssets; j++, counter++) {
      //
    }
  }
  return counter;
}

export default class extends Component {
  get chart() {
    return this.chartRef.current;
  }

  get autoChart() {
    return this.autoChartRef.current;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.autoChartRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnalyze = this.handleAnalyze.bind(this);
    this.fetchDataForManual = this.fetchDataForManual.bind(this);
    this.handleRemoveAsset = this.handleRemoveAsset.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.handleAddNewAsset = this.handleAddNewAsset.bind(this);

    this.cachedCompanyData = {};

    this.state = {
      activeItem: '1', // Tab

      start: '2019/1/1',
      end: '2019/3/1',
      companies: [
        { label: 'AGILENT TECHNOLOGIES INC', value: 'A' },
        { label: 'AMERICAN AIRLINES GROUP INC', value: 'AAL' },
        { label: 'APPLIED OPTOELECTRONICS INC', value: 'AAOI' }
      ],

      minW: -0.5,
      maxW: 1.5,
      corr: { '1-2': 0.3, '1-3': -0.1, '2-3': 0.3 },
      assets: [
        {
          value: 'VNG',
          mean: 20,
          stdev: 4
        }, {
          value: 'VTC',
          mean: 22,
          stdev: 5
        }, {
          value: 'LQC',
          mean: 24,
          stdev: 4
        }, {

        }
      ]
    };
  }

  componentDidMount() {
    this.fetchDataForManual();
  }

  fetchDataForManual() {
    const {
      assets: rawAssets, corr, minW, maxW
    } = this.state;
    const assets = rawAssets.filter((asset) => isValidAsset(asset));
    const corrs = [];
    for (let i = 0; i < assets.length - 1; i++) {
      for (let j = i + 1; j < assets.length; j++) {
        corrs.push(corr[`${i + 1}-${j + 1}`]);
      }
    }
    superagent.get('https://finsys-iuh.herokuapp.com/portfolio_list' || '/data.csv')
      .query({
        mean: assets.map((asset) => asset.mean).join(','),
        stdev: assets.map((asset) => asset.stdev).join(','),
        corr: corrs.join(','),
        minW,
        maxW
      })
      .catch(() => {
        alert('Unable to connect to the server. Please check your network connection and try again.');
      })
      .then((rs) => {
        this.chart.updateChart(rs.body);
        this.autoChart.updateChart(rs.body);
      });
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  handleAddNewAsset() {
    this.setState((prevState) => {
      const newCompanies = [...prevState.companies, {}];
      return {
        companies: newCompanies
      };
    });
  }

  handleDateRangeChange(startRange, endRange) {
    this.setState({
      start: startRange,
      end: endRange
    }, () => {
      const { companies, start, end } = this.state;
      this.fetchOnlineData({ companies, start, end });
    });
  }

  handleCompanyChange(company, index) {
    this.setState((prevState) => {
      const { companies } = prevState;
      companies[index] = company;
      return {
        companies
      };
    }, () => {
      const { companies, start, end } = this.state;
      this.fetchOnlineData({ companies, start, end });
    });
  }

  async fetchOnlineData({ companies, start, end }) {
    const filteredCompanies = companies && companies.filter((company) => company.value);
    if (!filteredCompanies || filteredCompanies.length < 2) return;

    const rawData = await Promise.all(
      companies.map((company) => new Promise((resolve) => {
        if (this.cachedCompanyData[company.value]) {
          resolve(this.cachedCompanyData[company.value]);
          return;
        }

        const req = unirest('GET', 'https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle');
        req.query({
          symbol: company.value,
          from: new Date(start).getTime() / 1000,
          to: new Date(end).getTime() / 1000,
          resolution: 'D'
        });
        req.headers({
          'x-rapidapi-host': 'finnhub-realtime-stock-price.p.rapidapi.com',
          'x-rapidapi-key': 'afa8908cd3mshe6b80263496b934p155993jsn9a2c2f3bbe0d',
          useQueryString: true
        });
        req.end((res) => {
          if (res.error) return;
          if (res.body.s !== 'ok') {
            // alert(`Company ${company.label} has no data`);
            return;
          }
          const data = this.resolveOnlineData(res.body);
          this.cachedCompanyData[company.value] = data;
          resolve(data);
        });
      }))
    );
    const assets = this.computeAssetsFromOnlineStock(rawData);
    this.fetchDataForAutoCalculation(assets);
    // this.updateChart(data);
  }

  // eslint-disable-next-line class-methods-use-this
  resolveOnlineData(data) {
    const {
      // eslint-disable-next-line no-unused-vars
      t: times, o: open, h: high, l: low, c: close
    } = data;
    return times.map((time, i) => ({
      x: new Date(time * 1000),
      y: close[i]
    }));
  }

  // eslint-disable-next-line class-methods-use-this
  computeAssetsFromOnlineStock(rawData) {
    const assets = rawData.map((companyData) => companyData.map((row) => Math.round(row.y)));
    return assets;
  }

  fetchDataForAutoCalculation(assets) {
    return superagent.post('https://finsys-iuh.herokuapp.com/portfolio_company/')
      .send({
        assets
      })
      .then((rs) => {
        this.chart.updateChart(rs.body);
      })
      .catch(() => {
        this.chart.updateChart(financeData);
      });
  }

  updateChart(data) {
    this.chart.chart.updateSeries([
      { name: '', data }
    ]);
  }

  handleRemoveAsset(assetIndex) {
    this.setState((prevState) => {
      const { corr, assets } = prevState;
      const clonedCorr = { ...corr };
      for (let i = 0; i < assets.length - 1; i++) {
        for (let j = i + 1; j < assets.length; j++) {
          if (i === +assetIndex || j === +assetIndex) {
            //
          } else {
            const newI = i > assetIndex ? i - 1 : i;
            const newJ = j > assetIndex ? j - 1 : j;
            clonedCorr[`${newI + 1}-${newJ + 1}`] = corr[`${i + 1}-${j + 1}`];
          }
        }
      }
      return {
        corr: clonedCorr
      };
    });
  }

  handleAnalyze() {
    this.fetchDataForManual();
  }

  toggle = (tab) => () => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    const {
      assets, corr, minW, maxW, start, end, companies
    } = this.state;

    return (
      <div>
        <MDBContainer className="mt-4">
          <MDBNav className="nav-tabs">
            <MDBNavItem>
              <MDBNavLink link to="#" active={this.state.activeItem === '1'} onClick={this.toggle('1')} role="tab">
                Manual Computation
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink link to="#" active={this.state.activeItem === '2'} onClick={this.toggle('2')} role="tab">
                Analyze Company Stock
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
          <MDBTabContent activeItem={this.state.activeItem}>
            <MDBTabPane tabId="1" role="tabpanel">
              <Row className="my-3">
                <Col size="12">
                  <div className="d-inline-flex">
                    <AssetsTable
                      name="assets"
                      value={assets}
                      onChange={this.handleInputChange}
                      onRemoveAsset={this.handleRemoveAsset}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="my-3">
                <Col size="9">
                  <CorrTable
                    name="corr"
                    value={corr}
                    assets={assets}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col size="3">
                  <MinMaxW
                    min={minW}
                    max={maxW}
                    onChange={this.handleInputChange}
                    onAnalyze={this.handleAnalyze}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <PortfolioChart ref={this.chartRef} />
                </Col>
              </Row>
            </MDBTabPane>
            <MDBTabPane tabId="2" role="tabpanel">
              <Row>
                <Col>
                  <MDBCard className="mx-2 my-3">
                    <div className="d-flex flex-column">
                      {companies.map((company, index) => (
                        <div>
                          <CompanySelect
                            key={`${company.value}-${index}`}
                            className="m-2"
                            value={company.value && company}
                            onChange={(option) => this.handleCompanyChange(option, index)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <MDBBtn onClick={this.handleAddNewAsset}>+ Add New Asset</MDBBtn>
                    </div>
                  </MDBCard>
                </Col>
                <Col>
                  <DateTimePicker
                    className="mx-2 my-3"
                    start={start}
                    end={end}
                    onChange={this.handleDateRangeChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col size="" className="m-3">
                  <PortfolioChart ref={this.autoChartRef} />
                </Col>
              </Row>
            </MDBTabPane>
          </MDBTabContent>
        </MDBContainer>
      </div>
    );
  }
}
