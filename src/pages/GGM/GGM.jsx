import React from 'react';
import './GGM.scss';
import {
  MDBTable, MDBTableHead, MDBTableBody, Row, Col, MDBContainer, MDBInputGroup,
  MDBTypography
} from 'mdbreact';
import Select from 'react-select';
import GGMchart from '../../components/charts/GGM-chart/GGMchart';


function computeD1({ D, g } = {}) {
  return +D * (1 + +(g / 100)) || 0;
}

function computeP({ D, r, g } = {}) {
  return computeD1({ D, g }) / ((r / 100) - (g / 100)) || 0;
}

function computeAllD({ D, g } = {}) {
  const listAllD = [];
  let i = 0;
  let Dnext;
  for (i = 0; i < 12; i++) {
    listAllD.push(D);
    Dnext = computeD1({ D, g });
    D = Dnext;
  }
  return listAllD;
}

function computeAllD({D, g} = {}){
  let listAllD = []
  let i = 0; 
  let D_month;
  for (i = 0; i < 12; i++) { 
    listAllD.push(D);
    D_month = computeD1({ D, g });
    D = D_month;
  }
  return listAllD || 0;

}

export default class extends React.Component {
  get chart() {
    return this.chartRef.current.chart;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.state = {
      selectedCompany: '',
      companies: [
        { name: 'Google', P: 67.2 },
        { name: 'Microsoft', P: 55.1 },
        { name: 'Apple', P: 83.5 }
      ],
      D: 3,
      r: 10,
      g: 8
    };
  }

  componentDidMount() {
    this.updateChart();
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    }, () => {
      this.updateChart();
    });
  }

  handleCompanyChange(company) {
    this.setState({
      selectedCompany: company
    });
  }

  updateChart() {
    const { D, g } = this.state;
    const data = computeAllD({ D, g });
    this.chart.updateSeries([
      {
        name: 'All D',
        data
      }
    ]);
  }

  // updateChart(data) {
  //   this.chartComponent.chart.updateSeries([
  //     { name: '', data }
  //   ]);
  // }

  render() {
    const {
      companies, selectedCompany, D, r, g
    } = this.state;
    const companyOptions = companies.map((companyI) => ({ label: companyI.name, value: companyI }));
    const company = selectedCompany.value;

    return (

      <Row className="m-5">
        <Col className="col-3">
          <Row className="card mt-4">
            <MDBTable>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Current Dividend($)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="D" value={D} onChange={this.handleInputChange} type="number" />
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>The Interest Rate(%)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="r" value={r} onChange={this.handleInputChange} type="number" min="0" step="0.1" />
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Growth Rate In Dividends(%)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="g" value={g} onChange={this.handleInputChange} type="number" min="0" step="0.1" pre />
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead color="danger-color" textWhite>
                <tr>
                  <th>Current Price Of Stock($)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <MDBTypography tag="h5" variant="h5">{computeP({ D, r, g }).toFixed(3)}</MDBTypography>
                </tr>
                <div className="d-flex">
                  <datadddd
                    onChange={this.handleInputChange}
                    onAnalyze={this.handleAnalyze}
                  />
                </div>
              </MDBTableBody>
            </MDBTable>
          </Row>
          <Row className="card mt-3">
            <div className="d-inline-block my-2 col-6 offset-6">
              <Select
                options={companyOptions}
                value={selectedCompany}
                onChange={this.handleCompanyChange}
              />
            </div>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <MDBTypography tag="h4">Company Stock Price<sub>({company && company.name})</sub></MDBTypography>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <MDBTypography tag="h5" variant="h5">{company && company.P}</MDBTypography>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </Row>
        </Col>
        <Col>
          <GGMchart ref={this.chartRef} />
        </Col>
      </Row>
    );
  }
}
