import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (
            <div className="branch" style={{height:70}}>
                <div className="bg-top navbar-light" style={{ background: "white" }}>
                    <div className="container">
                        <div className="row no-gutters d-flex align-items-center align-items-stretch">
                            <div className="col-md-4 d-flex align-items-center">
                                <a className="navbar-brand" href="/home" style={{fontSize: 30}}> FinSys</a>
                            </div>
                            <div className="col-lg-8 d-block">
                                <div className="row d-flex">
                                    <div className="col-md d-flex topper align-items-center align-items-stretch py-md-4">
                                        <div className="icon d-flex justify-content-center align-items-center"><span className="icon-paper-plane"></span></div>
                                        <div className="text">
                                            <span>Email</span>
                                            <span>Finsys@iuh.com.vn</span>
                                        </div>
                                    </div>
                                    <div className="col-md d-flex topper align-items-center align-items-stretch py-md-4">
                                        <div className="icon d-flex justify-content-center align-items-center"><span className="icon-phone2"></span></div>
                                        <div className="text">
                                            <span>Call</span>
                                            <span>Call Us: + 1235 2355 98</span>
                                        </div>
                                    </div>
                                    <div className="col-md topper d-flex align-items-center justify-content-end">
                                        <p className="mb-0 d-block">
                                            <a href="#" className="btn py-2 px-3 btn-primary">
                                                <span>Free Consulting</span>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>

        );
    }
}