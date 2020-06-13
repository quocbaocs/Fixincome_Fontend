/* eslint-disable max-len */
import React from 'react';
import './HM.scss';
import {
  MDBTable, MDBTableHead, MDBTableBody, Row, Col, MDBContainer, MDBInputGroup, MDBTypography
} from 'mdbreact';
import HModelchart from '../../components/charts/HModel-chart/HModelchart';


function computeP({
  D, r, g1, g2, t
} = {}) {
  return ((D * (1 + +(g2 / 100))) / ((r / 100) - (g2 / 100))) + ((D * (t / 2) * ((g1 / 100) - (g2 / 100))) / ((r / 100) - (g2 / 100))) || 0;
}

function computeStepSize({ g1, g2, t } = {}) {
  return (g1 - g2) / +t || 0;
}

function computeDiscoutRate({ g1, g2, t } = {}) {
  const listDiscount = [];
  let dr;
  const stepSizeValue = computeStepSize({ g1, g2, t });
  listDiscount.push(g1);
  for (let index = 1; index < +t + 1 + 2; index++) {
    if (index > +t) {
      listDiscount.push(g2);
    } else {
      dr = g1 - (index - 0) * stepSizeValue;
      listDiscount.push(dr);
    }
  }
  return listDiscount;
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
      D: 3,
      r: 11,
      g1: 10,
      g2: 2,
      t: 12
    };
  }

  componentDidMount() {
    this.updateChart();
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.updateChart();
      }
    );
  }

  updateChart() {
    const { g1, g2, t } = this.state;
    const data = computeDiscoutRate({ g1, g2, t })
      .map((point, index) => [index, point]);
    console.log(data);
    this.chart.updateOptions({
      stroke: {
        width: 3
      },
      markers: {
        size: 6
      }
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
          <Row className="card mt-4 ">
            <MDBContainer>
              <MDBInputGroup
                label="The Most Recent Dividend Payment"
                containerClassName="mb-3 row-3"
                append="$"
                inputs={(
                  <>
                    <input name="D" value={D} onChange={this.handleInputChange} type="number" className="col-5" />
                  </>
                )}
              />
            </MDBContainer>
            <MDBInputGroup
              label="The Initial High And Terminal Growth Rate"
              containerClassName="mb-3 col-10"
              append="%"
              inputs={(
                <>
                  <input name="g1" value={g1} onChange={this.handleInputChange} type="number" min="0" step="0.1" className="col" />
                  <input name="g2" value={g2} onChange={this.handleInputChange} type="number" min="0" step="0.1" className="col" />
                </>
              )}
            />
            <MDBContainer>
              <MDBInputGroup
                label="The Discount Rate"
                containerClassName="mb-3 row-3"
                append="%"
                inputs={(
                  <>
                    <input name="r" value={r} onChange={this.handleInputChange} type="number" min="0" step="0.1" className="col-5" />
                  </>
                )}
              />
            </MDBContainer>
            <MDBContainer>
              <MDBInputGroup
                label="Time"
                containerClassName="mb-3 row-3"
                append="year"
                inputs={(
                  <>
                    <input name="t" value={t} onChange={this.handleInputChange} type="number" min="0" step="1" className="col-5" />

                  </>
                )}
              />
            </MDBContainer>
          </Row>
          <Row className="card mt-3">
            <MDBTable>
              <MDBTableHead color="secondary-color-dark" textWhite>
                <tr>
                  <th>Stock Value($)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <MDBTypography tag="h5" variant="h5" className="m-3">
                      {computeP({
                        D, r, g1, g2, t
                      }).toFixed(3)}
                    </MDBTypography>
                  </td>
                </tr>
              </MDBTableBody>
              {/* <MDBTableHead color="secondary-color-dark" textWhite>
                <tr>
                  <th>Step size</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <MDBTypography tag="h5" variant="h5" className="m-3">
                      {computeStepSize({
                        g1, g2, t
                      }).toFixed(3)}
                    </MDBTypography>
                  </td>
                </tr>
              </MDBTableBody> */}
            </MDBTable>
          </Row>
        </Col>

        <Col className="m-3">
          <div className="">
            <HModelchart ref={this.chartRef} />
          </div>
        </Col>
      </Row>
    );
  }
}
