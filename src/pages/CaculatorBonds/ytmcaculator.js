import React, { Component } from 'react'
import './ytm.css';
class YtmFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            principal: '',
            mvalue: '',
            rate: '',
            ci: 'a',
            years: '',
        };
    }
    handleButtonClick = () => {
        this.form.reset() // resets "username" field to "admin"
    }
    myChangeprincipal = (event) => {
        this.setState({ principal: event.target.value });
    }
    myChangeMvalue = (event) => {
        this.setState({ mvalue: event.target.value });
    }
    myChangeRate = (event) => {
        this.setState({ rate: event.target.value });
    }
    myChangeCi = (event) => {
        this.setState({ ci: event.target.value });
    }
    myChangeYears = (event) => {
        this.setState({ years: event.target.value });
    }

    addAction = (event) => {
        var principal = this.state.principal;
        var mvalue = this.state.mvalue;
        var rate = this.state.rate;
        var ci = this.state.ci;
        var time = this.state.time;
        var irate = rate / (ci * 100);
        var pvalue;
        if (time < 12 / ci)
            pvalue = 0;
        else
            pvalue = principal * irate;
        var yeld = ((pvalue) * (1) * (Math.pow((1 + irate), ((time) * ci / 12)) - 1 * 1) / (irate)) + principal * 1 - mvalue * 1;
        var value_yield = Math.round(yeld * 100) / 100;
        var mv_mtry = Math.round((yeld * 12 * 100 / (time * mvalue)) * 100) / 100;
        var ayield = Math.round(((pvalue) * (1) * (Math.pow((1 + irate), ((12) * ci / 12)) - 1 * 1) / (irate)) * 100) / 100;
        var apyield = Math.round((((pvalue) * (1) * (Math.pow((1 + irate), ((12) * ci / 12)) - 1 * 1) / (irate)) * 100 / mvalue) * 100) / 100;
        this.setState({ yield: value_yield, mv: mv_mtry, ayield: ayield, apyield: apyield });

    }
    ComputedAction = (event) => {
        var facevalue = this.state.principal;
        var currentvalue = this.state.mvalue;
        var yeld = this.state.rate;

        var yieldcompute;
        var adjust;
        var years = this.state.years;
        var numberpaymentscompute;

        var paymentinterval = this.state.ci;
        // var currentyield;
        var maturityyield;

        if (paymentinterval === "a") {
            numberpaymentscompute = years;
            yieldcompute = yeld;
            adjust = 1;
        }

        else if (paymentinterval === "sa") {
            numberpaymentscompute = years * 2;
            yieldcompute = yeld / 2;
            adjust = 2;
        }
        else if (paymentinterval === "q") {
            numberpaymentscompute = years * 4;
            yieldcompute = yeld / 4;
            adjust = 4;
        }
        else if (paymentinterval === "m") {
            numberpaymentscompute = years * 12;
            yieldcompute = yeld / 12;
            adjust = 12;
        }
        else if (paymentinterval === "d") {
            numberpaymentscompute = years * 365;
            yieldcompute = yeld / 365;
            adjust = 365;
        }


        var type = 0;
        var guess = 0.1;

        var nper = numberpaymentscompute;

        var pmt = facevalue * (yieldcompute / 100);

        var pv = currentvalue * -1;


        var fv = facevalue * 1;


        var rate = guess;


        var f;
        var x0;
        var x1;
        var y0;
        var y1;
        var y;

        if (Math.abs(rate) < .000000001) {
            y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;
        } else {
            f = Math.exp(nper * Math.log(1 + rate));
            y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;
        }
        y0 = pv + pmt * nper + fv;
        y1 = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;

        // find root by secant method
        var i = x0 = 0.0;
        x1 = rate;
        while ((Math.abs(y0 - y1) > .000000001) && (i < 128)) {
            rate = (y1 * x0 - y0 * x1) / (y1 - y0);
            x0 = x1;
            x1 = rate;

            if (Math.abs(rate) < .000000001) {
                y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv;
            } else {
                f = Math.exp(nper * Math.log(1 + rate));
                y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv;
            }

            y0 = y1;
            y1 = y;
            ++i;

        }
        maturityyield = rate * adjust;

        maturityyield = maturityyield * 100;

        maturityyield = Math.round(maturityyield * 10000) / 10000;
        // maturityyield = maturityyield.toString().concat('%');

        this.setState({ yield_value: maturityyield });


    }
    render() {
        return (

            <form ref={form => this.form = form}>
                <table>
            <tr>{this.state.years}</tr>
                </table>
                <table>
                    <tr>
                        <td>Face Value ($):</td>
                        <td><input
                            type='text' id='principal' NAME="facevalue"
                            onChange={this.myChangeprincipal}
                        /></td>
                    </tr>
                    <tr>
                        <td>Current Value ($):</td>
                        <td><input
                            type='text' id='mvalue' NAME="currentvalue"
                            onChange={this.myChangeMvalue}
                        /></td>
                    </tr>
                    <tr>
                        <td>Annual Coupon Rate (%):	</td>
                        <td><input
                            type='text' id='rate' NAME="yield"
                            onChange={this.myChangeRate}
                        /></td>
                    </tr>
                    <tr>
                        <td>Coupon payment</td>
                        <td>
                            <select name="paymentinterval" value={this.state.value} onChange={this.myChangeCi.bind(this)} defaultValue='1' useDefault={true}>
                                <option value='a'>Yearly</option>
                                <option value='sa'>Half yearly</option>
                                <option value='q'>Quarterly</option>
                                <option value='m'>Monthly</option>
                                <option value='d'>Day</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Years to Maturity:</td>
                        <td><input
                            type='text' id='years'
                            onChange={this.myChangeYears}
                        /></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td rowSpan='1'>
                            <input class='button' type="button" onClick={this.handleButtonClick} value="Reset" />
                            <input class='button' type="button" onClick={this.ComputedAction} value="Submit" />
                        </td>
                    </tr>
                    <tr>
                        <td>Yield to maturity (YTM)</td>
                        <td>{this.state.yield_value} %</td>
                    </tr>
            <br></br>
                </table>



            </form>
        );
    }
}
export default YtmFrom;