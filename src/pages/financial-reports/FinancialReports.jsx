import React, { Component } from 'react';
import {
  MDBRow, MDBCol, MDBCard
} from 'mdbreact';
import unirest from 'unirest';
import FinanceReport from '../../components/charts/Finance-report/FinanceReport';
import CompanySelect from '../../components/company-select/CompanySelect';


export default class extends Component {
  get incomeStatementChart() {
    return this.incomeStatementChartRef.current;
  }

  get balanceSheetChart() {
    return this.balanceSheetChartRef.current;
  }

  get cashFlowChart() {
    return this.cashFlowChartRef.current;
  }

  constructor(props) {
    super(props);
    this.incomeStatementChartRef = React.createRef();
    this.balanceSheetChartRef = React.createRef();
    this.cashFlowChartRef = React.createRef();
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    // this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.state = {
      company: null,
      globalQuote: { }
    };
  }

  handleCompanyChange(selectedCompany) {
    this.setState({
      company: selectedCompany
    }, () => {
      const { company } = this.state;
      const symbol = company.value;
      this.fetchGlobalQuote(symbol);
      this.fetchFinancials(symbol);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  fetchGlobalQuote(company) {
    const req = unirest('GET', 'https://alpha-vantage.p.rapidapi.com/query');
    req.query({
      datatype: 'json',
      function: 'GLOBAL_QUOTE',
      symbol: company
    });
    req.headers({
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': 'afa8908cd3mshe6b80263496b934p155993jsn9a2c2f3bbe0d',
      useQueryString: true
    });
    req.end((res) => {
      if (res.error) {
        alert(res.error);
        return;
      }
      this.handleGlobalQuoteData(res.body);
    });
  }

  handleGlobalQuoteData(rawData) {
    const data = rawData['Global Quote'];
    const globalQuote = {
      symbol: data['01. symbol'],
      open: data['02. open'],
      prevClose: data['08. previous close'],
      high: data['03. high'],
      low: data['04. low'],
      price: data['05. price'],
      volume: data['06. volume'],
      change: data['09. change'],
      changePercent: data['10. change percent']
    };
    this.setState({
      globalQuote
    });
  }

  async fetchFinancials(symbol) {
    const companyInfo = await this.queryCompanyInfo(symbol);
    const { ticker } = companyInfo;
    const req = unirest('GET', 'https://bloomberg-market-and-financial-news.p.rapidapi.com/stock/get-financials');
    req.query({
      id: ticker
    });
    req.headers({
      'x-rapidapi-host': 'bloomberg-market-and-financial-news.p.rapidapi.com',
      'x-rapidapi-key': 'afa8908cd3mshe6b80263496b934p155993jsn9a2c2f3bbe0d',
      useQueryString: true
    });
    req.end((res) => {
      if (res.error) {
        alert(res.error);
        return;
      }
      this.handleFinancialsData(res.body);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  queryCompanyInfo(symbol) {
    return new Promise((resolve) => {
      const req = unirest('GET', 'https://bloomberg-market-and-financial-news.p.rapidapi.com/market/auto-complete');

      req.query({
        query: symbol
      });

      req.headers({
        'x-rapidapi-host': 'bloomberg-market-and-financial-news.p.rapidapi.com',
        'x-rapidapi-key': 'afa8908cd3mshe6b80263496b934p155993jsn9a2c2f3bbe0d',
        useQueryString: true
      });

      req.end((res) => {
        if (res.error) {
          alert(res.error);
        }
        resolve(res.body.quote[0]);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  handleFinancialsData(rawData) {
    console.log(rawData);
    const [incomeData, balanceSheetData, cashFlowData] = rawData.result;
    this.updateIncomeStatementChart(incomeData);
    this.updateBalanceSheetChart(balanceSheetData);
    this.updateCashFlowChart(cashFlowData);
  }

  updateIncomeStatementChart(incomeData) {
    const { chartData } = incomeData.timeBasedSheets[0];
    const { columnHeadings } = incomeData.timeBasedSheets[0];
    const series = [{
      name: 'Revenue',
      type: 'column',
      data: chartData[0].values
    }, {
      name: 'Net Income',
      type: 'column',
      data: chartData[1].values
    }, {
      name: 'Profit Margin',
      type: 'line',
      data: chartData[2].values
    }];
    const xaxis = {
      categories: columnHeadings
    };
    this.incomeStatementChart.chart.updateSeries(series);
    this.incomeStatementChart.chart.updateOptions({ xaxis });
  }

  updateBalanceSheetChart(balanceSheetData) {
    const { chartData } = balanceSheetData.timeBasedSheets[0];
    const { columnHeadings } = balanceSheetData.timeBasedSheets[0];
    const series = [{
      name: 'Total Assets',
      type: 'column',
      data: chartData[0].values
    }, {
      name: 'Total Liabilities',
      type: 'column',
      data: chartData[1].values
    }, {
      name: 'Debt to Assets',
      type: 'line',
      data: chartData[2].values
    }];
    const xaxis = {
      categories: columnHeadings
    };
    this.balanceSheetChart.chart.updateSeries(series);
    this.balanceSheetChart.chart.updateOptions({ xaxis });
  }

  updateCashFlowChart(cashFlowData) {
    const { chartData } = cashFlowData.timeBasedSheets[0];
    const { columnHeadings } = cashFlowData.timeBasedSheets[0];
    const series = [{
      name: 'Operating',
      type: 'column',
      data: chartData[0].values
    }, {
      name: 'Investing',
      type: 'column',
      data: chartData[1].values
    }, {
      name: 'Financing',
      type: 'line',
      data: chartData[2].values
    }];
    const xaxis = {
      categories: columnHeadings
    };
    this.cashFlowChart.chart.updateSeries(series);
    this.cashFlowChart.chart.updateOptions({ xaxis });
  }

  updateChart(data) {
    this.chartComponent.chart.updateSeries([
      { name: '', data }
    ]);
  }

  render() {
    const { company, globalQuote } = this.state;

    return (
      <div>
        <MDBRow className="px-3">
          <MDBCol>
            <MDBCard className="p-3 my-3">
              <MDBRow>
                <MDBCol size="5">
                  <CompanySelect
                    className="m-3"
                    value={company}
                    name="company"
                    onChange={this.handleCompanyChange}
                  />
                </MDBCol>
                <MDBCol size="sm" className="m-3">
                  <div><h4> {globalQuote.price || 0}</h4></div>
                  <div><h5> {globalQuote.changePercent || 0} ({globalQuote.change || 0})</h5></div>
                </MDBCol>
              </MDBRow>

              <MDBRow className="mb-4">
                <MDBCol size="sm">
                  <div className="block-example">
                    <div><div className="cyan-text m-0 border-bottom border-dark">OPEN</div></div>
                    <div>{globalQuote.open || 0}</div>
                  </div>
                </MDBCol>
                <MDBCol size="sm">
                  <div className="block-example">
                    <div><div className="cyan-text m-0 border-bottom border-dark">HIGH</div></div>
                    <div>{globalQuote.high || 0}</div>
                  </div>
                </MDBCol>
                <MDBCol size="sm">
                  <div className="block-example">
                    <div><p className="cyan-text m-0 border-bottom border-dark">VOLUME</p></div>
                    <div>{globalQuote.volume || 0}</div>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol size="4">
                  <div className="block-example">
                    <div><div className="cyan-text m-0 border-bottom border-dark">PREV CLOSE</div></div>
                    <div>{globalQuote.prevClose || 0}</div>
                  </div>
                </MDBCol>
                <MDBCol size="4">
                  <div className="block-example">
                    <div><div className="cyan-text m-0 border-bottom border-dark">LOW</div></div>
                    <div>{globalQuote.low || 0}</div>
                  </div>
                </MDBCol>
                {/* <MDBCol size="sm">
                  <span className="block-example border-bottom border-dark">
                    <MDBTableHead>52 WEEK RANGE</MDBTableHead>
                    <MDBTableBody>data</MDBTableBody>
                  </span>
                </MDBCol> */}
              </MDBRow>
            </MDBCard>
          </MDBCol>

          <MDBCol>
            <MDBCard className="p-3 my-3">
              <h3>Income Statement</h3>
              <div className="d-flex">
                <div className="flex-fill">
                  <FinanceReport ref={this.incomeStatementChartRef} />
                </div>
                {/* <div className="mx-3" style={{ whiteSpace: 'pre' }}>
                  <div>
                    <div>Revenue</div>
                    <div>{}</div>
                  </div>
                  <div>
                    <div>Net Income</div>
                  </div>
                  <div>
                    <div>Profit Margin</div>
                  </div>
                </div> */}
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <MDBRow className="px-3">
          <MDBCol>
            <MDBCard className="p-3 my-3">
              <h3>Balance Sheet</h3>
              <div className="d-flex">
                <div className="flex-fill">
                  <FinanceReport ref={this.balanceSheetChartRef} />
                </div>
                {/* <div className="mx-3">
                  <div>name</div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    <p><MDBIcon icon="circle" size="lg" className="black-text mr-2" />Total Assets</p>
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    <p><MDBIcon icon="circle" size="lg" className="indigo-text mr-2" />Total Liabilitles</p>
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    <p><MDBIcon icon="circle" size="lg" className="red-text mr-2" />Debt To Assets</p>
                  </div>
                </div> */}
              </div>
            </MDBCard>
          </MDBCol>

          <MDBCol>
            <MDBCard className="p-3 my-3">
              <h3>Cash Flow</h3>
              <div className="d-flex">
                <div className="flex-fill">
                  <FinanceReport ref={this.cashFlowChartRef} />
                </div>
                {/* <div className="mx-3">
                  <div>name</div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    <p><MDBIcon icon="circle" size="lg" className="black-text mr-2" />Operating</p>
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    <p><MDBIcon icon="circle" size="lg" className="indigo-text mr-2" />Investing</p>
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap' }}>
                    <p><MDBIcon icon="circle" size="lg" className="red-text mr-2" />Financing</p>
                  </div>
                </div> */}
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
