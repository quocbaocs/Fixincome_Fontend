import React, { Component } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'


export default class extends Component {
    render() {
        return (
            <div>
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8 text-center heading-section">
                        <h2 className="mb-4">Our Members</h2>
                        <p>Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
                    </div>
                </div>
                <div className="container my-4">
                    {/*Carousel Wrapper*/}
                    <div id="multi-item-example" className="carousel slide carousel-multi-item" data-ride="carousel">

                        {/*Indicators*/}
                        <ol className="carousel-indicators">
                            <li data-target="#multi-item-example" data-slide-to={0} className="active" />
                            <li data-target="#multi-item-example" data-slide-to={1} />
                            <li data-target="#multi-item-example" data-slide-to={2} />
                        </ol>
                        {/*/.Indicators*/}
                        {/*Slides*/}
                        <div className="carousel-inner" role="listbox">
                            {/*First slide*/}
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className=" ">
                                            <div className="card-body">
                                                <div className="testimony-wrap d-flex">
                                                    <div className="user-img"  >
                                                        <img className="user-img" src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg'></img>
                                                    </div>
                                                    <div className="text pl-4">
                                                        <span className="quote d-flex align-items-center justify-content-center">
                                                            <i className="icon-quote-left"></i>
                                                        </span>
                                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                                        <p className="name">Ken Bosh</p>
                                                        <span className="position">Businesswoman</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className=" ">
                                            <div className="card-body">
                                                <div className="testimony-wrap d-flex">
                                                    <div className="user-img"  >
                                                        <img className="user-img" src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg'></img>
                                                    </div>
                                                    <div className="text pl-4">
                                                        <span className="quote d-flex align-items-center justify-content-center">
                                                            <i className="icon-quote-left"></i>
                                                        </span>
                                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                                        <p className="name">Ken Bosh</p>
                                                        <span className="position">Businesswoman</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className=" ">
                                            <div className="card-body">
                                                <div className="testimony-wrap d-flex">
                                                    <div className="user-img"  >
                                                        <img className="user-img" src='https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(18).jpg'></img>
                                                    </div>
                                                    <div className="text pl-4">
                                                        <span className="quote d-flex align-items-center justify-content-center">
                                                            <i className="icon-quote-left"></i>
                                                        </span>
                                                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                                        <p className="name">Ken Bosh</p>
                                                        <span className="position">Businesswoman</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*/.First slide*/}


                        </div>
                        {/*/.Slides*/}
                    </div>
                    {/*/.Carousel Wrapper*/}
                </div>
            </div>


        );
    }
}