import React from 'react';
import {
  MDBTable, MDBTableHead, MDBTableBody, Row, Col, MDBContainer, MDBInputGroup,
  MDBTypography
} from 'mdbreact';
import Select from 'react-select';
import TwoStage from '../../components/charts/2-stage/TwoStage';


function computeDiv({ D, g1 } = {}) {
  return +D * (1 + (+g1 / 100)) || 0;
}

// Div end of high growth
function computeDivL({ D, g1, t } = {}) {
  return +D * ((1 + (+g1 / 100)) ** t) || 0;
}

// Div first of low growth
function computeDivN({
  D, g1, g2, t
} = {}) {
  const a = computeDivL({ D, g1, t });
  return +a * (1 + (+g2 / 100)) || 0;
}

// Stock value end of high growth
function computeGGM({
  D, g1, g2, t, r
} = {}) {
  const a = computeDivN({
    D, g1, g2, t
  });
  return +a / ((r / 100) - (g2 / 100));
}
// Value low growth
function computeSt({
  D, g1, g2, t, r
} = {}) {
  const a = computeGGM({
    D, g1, g2, t, r
  });
  return +a / (1 + (+r / 100)) ** t;
}

// Value high grwoth
function computeS1({
  D, g1, t, r
} = {}) {
  let i;
  let tong = 0;
  let Dnext;
  for (i = 1; i < +t + 1; i++) {
    Dnext = computeDiv({ D, g1 });
    D = Dnext;
    const P = D / ((1 + (r / 100)) ** i);
    tong += P;
  }
  return tong;
}

// Stock value
function computeValue({
  D, g1, g2, r, t
} = {}) {
  const a = computeS1({
    D, g1, t, r
  });
  const b = computeSt({
    D, g1, g2, t, r
  });
  const c = +a + +b;
  return c;
}

// Data for charting (high growth)
function dataD1({ D, g1, t } = {}) {
  const listAllD = [];
  let i;
  let Dnext;
  for (i = 0; i < +t + 1; i++) {
    listAllD.push(D);
    Dnext = computeDiv({ D, g1 });
    D = Dnext;
  }
  return listAllD;
}

// Data for charting (low growth)
function dataD2({
  D, g1, g2, t
} = {}) {
  const listAllD2 = [];
  let i;
  let Dnext;
  let Div = computeDivN({
    D, g1, g2, t
  });
  for (i = 0; i < +t + 1 + 3; i++) {
    listAllD2.push(Div);
    Dnext = computeDiv({ D: Div, g1: g2 });
    Div = Dnext;
  }
  return listAllD2;
}

// Concatenated array for charting
function D1D2({
  D, g1, g2, t
} = {}) {
  const a = dataD1({ D, g1, t });
  const b = dataD2({
    D, g1, g2, t
  });
  const c = a.concat(b);
  return c;
}

export default class extends React.Component {
  get chart() {
    return this.chartRef.current.chart;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      D: 1,
      r: 8,
      g1: 10,
      g2: 6,
      t: 3
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

  updateChart() {
    const {
      D, g1, g2, t
    } = this.state;
    const data = D1D2({
      D, g1, g2, t
    });
    this.chart.updateSeries([
      {
        name: 'All D',
        data
      }
    ]);
  }

  render() {
    const {
      D, r, g1, g2, t
    } = this.state;

    return (
      <Row className="m-5">
        <Col className="col-3">
          <Row className="card mt-4">
            <MDBTable>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>The Most Recent Dividend Payment($)</th>
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
                  <th>High Growth Rate(%)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="g1" value={g1} onChange={this.handleInputChange} type="number" min="0" step="0.1" pre />
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Low Growth Rate(%)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="g2" value={g2} onChange={this.handleInputChange} type="number" min="0" step="0.1" pre />
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>Time</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="t" value={t} onChange={this.handleInputChange} type="number" min="0" step="0.1" pre />
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead color="danger-color" textWhite>
                <tr>
                  <th>Stock Value($)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <MDBTypography tag="h5" variant="h5" className="col-5">{computeValue({
                    D, g1, g2, r, t
                  }).toFixed(2)}
                  </MDBTypography>
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
          {/* <Row className="card mt-3">
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
          </Row> */}
        </Col>
        <Col>
          <TwoStage ref={this.chartRef} />
        </Col>
      </Row>
    );
  }
}
