import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios';
import CurrencyPairIRP from '../../components/recurrency-pair/CurrencyPairIRP'
import '../Forex/InterestRateParityPage.scss'

const currencyPairs = ['USD/HKD', 'USD/GBP', 'USD/AUD', 'USD/CAD', 'USD/SGD', 'USD/JPY', 'USD/NZD'];
const currencyInterest = [0.2, 0.08, 0.2, 0.2, 0.3, 0.0, 0.3, 0.0];
const spotRateIRP = [7.7, 0.8, 1.53, 1.42, 1.4, 107.5, 1.63];

function InterestRateParity(spotRate, interestD, interestF) {
    let forwardRate = spotRate + ((1 + interestF) / (1 + interestD));
    return Math.round((forwardRate + Number.EPSILON) * 100) / 100;
}


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.fetchSpotRates = this.fetchSpotRates.bind(this)
        this.state = {
            fetchSpotRates: {
                rates: '',
            }
        }
        this.fetchSpotRates = this.fetchSpotRates.bind(this);
    }

    fetchSpotRates() {
        axios.get('https://api.exchangeratesapi.io/latest?symbols=HKD,GBP,AUD,CAD,SGD,JPY,NZD,EUR&base=USD')
            .then((response) => {
                console.log("response", response);
                this.setState({
                    fetchSpotRates: response.data.rates
                });
                console.log("fetchSpotRates", this.state.fetchSpotRates);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderTable = () => {
        let table = []

        for (let i = 0; i < currencyPairs.length; i++) {
            let children = [];
            children.push(<td>{currencyPairs[i]}</td>);
            children.push(<td>{spotRateIRP[i]}</td>);
            children.push(<td>{0.1}</td>);
            children.push(<td>{currencyInterest[i]}</td>);
            children.push(<td>{InterestRateParity(spotRateIRP[i], currencyInterest[i], 0.1)}</td>);
            table.push(<tr>{children}</tr>);
        }
        return table
    }


    render() {

        return (

            <div>
                <h1 >Interest Rate Parity</h1>
                <MDBTable className="interestRate-table white"> 
                <MDBTableHead> 
                    <tr>
                        <th>Currency pair</th>
                        <th>Spot rate</th>
                        <th>Interest after 1 year(Domestic  Currency)</th>
                        <th>Interest after 1 year(Foreign Currency)</th>
                        <th>Forward rate</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    
                    {this.renderTable()}
                </MDBTableBody>
            </MDBTable>
            </div>
            
            

        );
    }
}