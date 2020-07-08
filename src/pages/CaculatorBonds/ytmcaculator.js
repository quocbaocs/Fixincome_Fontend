import React, { Component } from 'react'
import './ytm.css';
class YtmFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            principal: '',
            mvalue: '',
            rate: '',
            ci: '1',
            time: '',
            irate: '',

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
    myChangeMonthsMaturity = (event) => {
        this.setState({ time: event.target.value });
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
    render() {
        return (

            <form ref={form => this.form = form}>
                <table>
                    {/* <tr>
                        <td>{this.state.principal}</td>
                        <td>{this.state.mvalue}</td>
                        <td>{this.state.rate}</td>
                        <td>{this.state.ci}</td>
                        <td>{this.state.time}</td>
                        <td>{this.state.irate}</td>

                    </tr> */}
                </table>
                <table>
                    <tr>
                        <td>Par value</td>
                        <td><input
                            type='text' id='principal'
                            onChange={this.myChangeprincipal}
                        /></td>
                    </tr>
                    <tr>
                        <td>Market value</td>
                        <td><input
                            type='text' id='mvalue'
                            onChange={this.myChangeMvalue}
                        /></td>
                    </tr>
                    <tr>
                        <td>Coupon rate</td>
                        <td><input
                            type='text' id='rate'
                            onChange={this.myChangeRate}
                        /></td>
                    </tr>
                    <tr>
                        <td>Coupon payment</td>
                        <td>
                            <select value={this.state.value} onChange={this.myChangeCi.bind(this)} defaultValue='1' useDefault={true}>
                                <option value='1'>Yearly</option>
                                <option value='2'>Half yearly</option>
                                <option value='4'>Quarterly</option>
                                <option value='12'>Monthly</option>
                                <option value='365'>Day</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Months till maturity</td>
                        <td><input
                            type='text' id='time'
                            onChange={this.myChangeMonthsMaturity}
                        /></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td rowSpan='1'> 
                            <input class='button' type="button" onClick={this.handleButtonClick} value="Reset"/>
                            <input class='button' type="button" onClick={this.addAction} value="Submit" />
                        </td>
                    </tr>
                    <tr>
                        <td>Total Yield</td>
                        <td>{this.state.yield}</td>
                    </tr>
                    <tr>
                        <td>Yield to maturity (YTM)</td>
                        <td>{this.state.mv} %</td>
                    </tr>
                    <tr>
                        <td>Annualized yield</td>
                        <td>{this.state.ayield}</td>
                    </tr>
                    <tr>
                        <td>Annualized yield %</td>
                        <td>{this.state.apyield} %</td>
                    </tr>
                    
                </table>



            </form>
        );
    }
}
export default YtmFrom;