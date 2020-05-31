import React from 'react';

function FPCalc(spotRate, iRD, currIR, days) {
    let fwPoint = (spotRate * (iRD / 100) * (days / 360)) / (1 + ((currIR / 100) * (days / 360)));
    return fwPoint;
}

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fwPoint: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            fwPoint: FPCalc(this.state.spotRate, this.state.iRD, this.state.currIR, this.state.days).toFixed(5)
        });

    }
    render() {
        const {
            spotRate, iRD, currIR, days
        } = this.state;
        return (
            <div class="row justify-content-center" style={{ color: "white" }}>
                <div class="col-auto">
                    <h2 className='FXTitle'>Forward Point Calculator</h2>
                    <div className='FXForwardPoint ' style={{ color: "white" }}>
                        <br />
                        <form onSubmit={this.handleSubmit}>
                            <table>
                                <tr>
                                    <td><label>Spot rate:</label></td>
                                    <td>
                                        <input
                                            type="number"
                                            name='spotRate'
                                            value={spotRate}
                                            onChange={this.handleChange}
                                            min="0" step="0.1"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td> <label>Interest rate differential(%):</label> </td>
                                    <td><input
                                        type="number"
                                        name='iRD'
                                        value={iRD}
                                        onChange={this.handleChange}
                                        min="0" step="1"
                                    /></td>
                                </tr>
                                <tr>
                                    <td><label>Currency interest rate(%):</label></td>
                                    <td> <input
                                        type="number"
                                        name='currIR'
                                        value={currIR}
                                        onChange={this.handleChange}
                                        min="0" step="1"
                                    /></td>
                                </tr>
                                <tr>
                                    <td><label>Days:</label></td>
                                    <td><input
                                        type="number"
                                        name='days'
                                        value={days}
                                        onChange={this.handleChange}
                                        defaultValue={360}
                                    /></td>
                                </tr>
                                <tr>
                                    <input type="submit" value="Calculator" />
                                </tr>
                            </table>
                        </form>
                        <br />
                        <h4>Forward Point: {this.state.fwPoint}</h4>
                        <h4>Pips: {this.state.fwPoint * 10000}</h4>
                    </div>
                </div>
            </div>


        );
    }
}