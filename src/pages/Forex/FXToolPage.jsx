import React from 'react';
import {
  MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink
} from 'mdbreact';
import axios from 'axios';

function FPCalc(spotRate, iRD, currIR, days) {
  const fwPoint = (spotRate * (iRD / 100) * (days / 360)) / (1 + ((currIR / 100) * (days / 360)));
  return fwPoint;
}

function ForwardPriceCalc(spotRate, risk, t) {
  const forwardPrice = spotRate * (Math.exp((risk / 100) * (t / 12)));
  return forwardPrice;
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fwPoint: 0,
      fwPrice: 0,
      activeItem: '1', // Tab

      ccrBasePoint: 'EUR',
      ccrQuotePoint: 'USD',
      spotRate: '1.7',
      iRD: '2',
      currIR: '4',
      days: '360',

      ccrBasePrice: 'EUR',
      ccrQuotePrice: 'USD',
      spotRateCcr: '1.7',
      risk: 0.05,
      t: 12
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitFWPoint = this.handleSubmitFWPoint.bind(this);
    this.handleSubmitFWPrice = this.handleSubmitFWPrice.bind(this);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  updateSpotRate() {
    const { ccrBasePoint, ccrQuotePoint } = this.state;
    axios.get(`https://api.exchangeratesapi.io/latest?symbols=${ccrQuotePoint}&base=${ccrBasePoint}`)
      .then((res) => {
        const spotRatePoint = res.data.rates[ccrQuotePoint];
        this.setState(() => ({
          spotRate: spotRatePoint.toFixed(4)
        }));
      });
  }

  updateSpotRatePrice() {
    const { ccrBasePrice, ccrQuotePrice } = this.state;
    axios.get(`https://api.exchangeratesapi.io/latest?symbols=${ccrQuotePrice}&base=${ccrBasePrice}`)
      .then((res) => {
        const spotRatePoint = res.data.rates[ccrQuotePrice];
        this.setState(() => ({
          spotRateCcr: spotRatePoint.toFixed(4)
        }));
      });
  }


  handleSubmitFWPoint(event) {
    event.preventDefault();
    this.updateSpotRate();
    this.setState((prevState) => ({
      fwPoint: FPCalc(prevState.spotRate, prevState.iRD, prevState.currIR, prevState.days).toFixed(4)
    }));
  }

  handleSubmitFWPrice(event) {
    event.preventDefault();
    this.updateSpotRatePrice();
    this.setState((prevState) => ({
      fwPrice: ForwardPriceCalc(prevState.spotRateCcr, prevState.t, prevState.risk).toFixed(4)
    }));
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
      ccrBasePoint, ccrQuotePoint, spotRate, iRD, currIR, days
    } = this.state;
    const {
      ccrBasePrice, ccrQuotePrice, spotRateCcr, risk, t
    } = this.state;
    const { fwPoint, fwPrice } = this.state;

    return (
      <MDBContainer>
        <MDBNav className="nav-tabs small">
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === '1'} onClick={this.toggle('1')} role="tab">
                      Forward Point
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink link to="#" active={this.state.activeItem === '2'} onClick={this.toggle('2')} role="tab">
                      Forward Price
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem}>
          <MDBTabPane tabId="1" role="tabpanel">
            <div className="row justify-content-center">
              <div className="col-auto">
                <h2 className="FXTitle text-white">Forward Point Calculator</h2>
                <div className="FXForwardPoint " style={{ color: 'white' }}>
                  <br />
                  <form onSubmit={this.handleSubmitFWPoint}>
                    <table>
                      <tr>
                        <td><label>Base Currency :</label></td>
                        <td>
                          <input
                            type="string"
                            name="ccrBasePoint"
                            value={ccrBasePoint}
                            onChange={this.handleChange}
                            min="0"
                            step="0.1"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Quote Currency:</label></td>
                        <td>
                          <input
                            type="string"
                            name="ccrQuotePoint"
                            value={ccrQuotePoint}
                            onChange={this.handleChange}
                            onBlur={() => this.updateSpotRate()}
                            min="0"
                            step="0.1"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Spot rate:</label></td>
                        <td>
                          <input
                            readOnly
                            type="number"
                            name="spotRate"
                            value={spotRate}
                            onChange={this.handleChange}

                            min="0"
                            step="0.1"

                          />
                        </td>
                      </tr>
                      <tr>
                        <td> <label>Interest rate differential(%):</label> </td>
                        <td><input
                          type="number"
                          name="iRD"
                          value={iRD}
                          onChange={this.handleChange}
                          min="0"
                          step="1"
                        />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Currency interest rate(%):</label></td>
                        <td> <input
                          type="number"
                          name="currIR"
                          value={currIR}
                          onChange={this.handleChange}
                          min="0"
                          step="1"
                        />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Days:</label></td>
                        <td><input
                          type="number"
                          name="days"
                          value={days}
                          onChange={this.handleChange}
                          defaultValue={360}
                        />
                        </td>
                      </tr>
                      <tr>
                        <input type="submit" value="Calculator" />
                      </tr>
                    </table>
                  </form>
                  <br />
                  <div>
                    <h4 className="text-white">Forward Point: {fwPoint}</h4>
                    <h4 className="text-white">Pips: {fwPoint * 10000}</h4>
                  </div>

                </div>
              </div>
            </div>
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <div className="row justify-content-center" style={{ color: 'white' }}>
              <div className="col-auto">
                <h2 className="FXTitle text-white">Forward Price Calculator</h2>
                <div className="FXForwardPrice " style={{ color: 'white' }}>
                  <br />
                  <form onSubmit={this.handleSubmitFWPrice}>
                    <table>
                      <tr>
                        <td><label>Base Currency:</label></td>
                        <td>
                          <input
                            type="text"
                            name="ccrBasePrice"
                            value={ccrBasePrice}
                            onChange={this.handleChange}

                            min="0"
                            step="0.1"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Quote Currency: </label></td>
                        <td>
                          <input
                            type="text"
                            name="ccrQuotePrice"
                            value={ccrQuotePrice}
                            onChange={this.handleChange}
                            onBlur={() => this.updateSpotRatePrice()}
                            min="0"
                            step="0.1"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Spot rate:</label></td>
                        <td>
                          <input
                            type="number"
                            name="spotRateCcr"
                            value={spotRateCcr}
                            onChange={this.handleChange}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Term of the forward contract(months):</label></td>
                        <td> <input
                          type="number"
                          name="t"
                          value={t}
                          onChange={this.handleChange}
                          step="1"
                        />
                        </td>
                      </tr>
                      <tr>
                        <td><label>Risk-free force of interest:(%)</label></td>
                        <td><input
                          type="number"
                          name="risk"
                          value={risk}
                          onChange={this.handleChange}
                        />
                        </td>
                      </tr>
                      <tr>
                        <input type="submit" value="Calculator" />
                      </tr>
                    </table>
                  </form>
                  <br />
                  <h4 className="text-white">Forward Price: {fwPrice}</h4>
                </div>
              </div>
            </div>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer>
    );
  }
}
