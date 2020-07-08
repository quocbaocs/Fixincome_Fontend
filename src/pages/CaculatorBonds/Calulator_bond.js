import React, { Component } from 'react'
import './Calulator_bond.css'
// eslint-disable-next-line
class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = { payments: '' ,
                        maturity:'',
                        ytm:'',
                        facevalue:'',
                        bondrate:'',


    };
    }
    handleButtonClick = () => {
        this.form.reset() // resets "username" field to "admin"
      }

    myChangePayments = (event) => {
        this.setState({ payments: event.target.value });
    }
    myChangeMaturity = (event) => {
        this.setState({ maturity: event.target.value });
    }
    myChangeYTM = (event) => {
        this.setState({ ytm: event.target.value });
    }
    myChangeFaceValue = (event) => {
        this.setState({ facevalue: event.target.value });
    }
    myChangeCouponRate = (event) => {
        this.setState({ bondrate: event.target.value });
    }
    addAction =(event)=> {
        var bondPrice=  Math.round(((this.state.facevalue*this.state.bondrate/this.state.payments*(1-(1+this.state.ytm/this.state.payments)**(-this.state.payments*this.state.maturity)))/(this.state.ytm/this.state.payments)) + this.state.facevalue*(1+(this.state.ytm/this.state.payments))**(-this.state.payments*this.state.maturity))
        // slet x = this.state.num1 + this.state.num2
        this.setState({result: bondPrice })
      }
    render() {
        return (
            
            <form ref={form => this.form = form} >
                <h1> Calculate the Bond Price</h1>
                <table>
                    <tr>
                        <td>Number of Payments Per Period:</td>
                        <td><input
                            type='text'
                            onChange={this.myChangePayments}
                        /></td>
                    </tr>
                    <tr>
                        <td>Number of Years to Maturity:</td>
                        <td><input
                            type='text'
                            onChange={this.myChangeMaturity}
                        /></td>
                    </tr>
                    <tr>
                        <td>Yield to Maturity (YTM)</td>
                        <td><input
                            type='text'
                            onChange={this.myChangeYTM}
                        /></td>
                    </tr>
                    <tr>
                        <td>Face Value:</td>
                        <td><input
                            type='text'
                            onChange={this.myChangeFaceValue}
                        /></td>
                    </tr>
                    <tr>
                        <td>Coupon Rate:</td>
                        <td><input
                            type='text'
                            onChange={this.myChangeCouponRate}
                        /></td>
                    </tr>
                    <tr></tr>
                    <tr>
                    <td> <input class='button' type="button" onClick={this.handleButtonClick} value="Reset" />
                      <input class='button' type="button" onClick={this.addAction} value="Calculate Bond Price"/>
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td><h1>PRICE =  {this.state.result}</h1></td>
                    </tr>
                </table>
               <h1> Calculate YTM</h1>
          
               
                
            </form>
        );
    }
}
export default MyForm;