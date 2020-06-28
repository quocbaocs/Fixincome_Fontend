/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import {
  MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCarouselCaption,
  MDBView, MDBMask
} from 'mdbreact';
import './HomePage.scss';
import '../../assets/css/flaticon.css';
import Home from '../../components/home/Home';


export default class extends React.Component {
  render() {
    return (

      <div style={{ backgroundColor: 'white' }}>

        <MDBCarousel
          activeItem={1}
          length={2}
          showControls={false}
          showIndicators
          className=" container"
        >
          <MDBCarouselInner>
            <MDBCarouselItem itemId="1">
              <MDBView>
                <img
                  className="d-block w-100 "
                  src="./images/image_1.jpg"
                  alt="First slide"

                />
                <MDBMask overlay="black-slight" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive ">Light mask</h3>
                <p>First text</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="2">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="./images/image_4.jpg"
                  alt="Second slide"
                />
                <MDBMask overlay="black-slight" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Strong mask</h3>
                <p>Second text</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
            <MDBCarouselItem itemId="3">
              <MDBView>
                <img
                  className="d-block w-100"
                  src="./images/image_6.jpg"
                  alt="Third slide"
                />
                <MDBMask overlay="black-slight" />
              </MDBView>
              <MDBCarouselCaption>
                <h3 className="h3-responsive">Slight Mast</h3>
                <p>Third text</p>
              </MDBCarouselCaption>
            </MDBCarouselItem>
          </MDBCarouselInner>
        </MDBCarousel>

        <section className="ftco-section" style={{ backgroundColor: 'white' }}>
          <div className="container">
            <div className="row d-flex">
              <div className="col-md-5 order-md-last wrap-about align-items-stretch">
                <div className="wrap-about-border  ">
                  <div className="img" style={{ backgroundImage: 'url(\'./images/about.jpg\')' }} />
                  <div className="text">
                    <h3>Read Our Success Story for Inspiration</h3>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                    <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word.</p>
                    <p><a href="#" className="btn btn-primary py-3 px-4">Contact us</a></p>
                  </div>
                </div>
              </div>
              <div className="col-md-7 wrap-about pr-md-4  ">
                <h2 className="mb-4">Our Main Features</h2>
                <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word.</p>
                <div className="row mt-5">
                  <div className="col-lg-6">
                    <div className="services active text-center">
                      <div className="icon mt-2 d-flex justify-content-center align-items-center"><span className="flaticon-search-engine" /></div>
                      <div className="text media-body">
                        <h3>Stock</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia.</p>
                      </div>
                    </div>
                    <div className="services text-center">
                      <div className="icon mt-2 d-flex justify-content-center align-items-center"><span className="flaticon-analysis" /></div>
                      <div className="text media-body">
                        <h3>Fixed Income</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="services text-center">
                      <div className="icon mt-2 d-flex justify-content-center align-items-center"><span className="flaticon-search-engine" /></div>
                      <div className="text media-body">
                        <h3>Fx</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia.</p>
                      </div>
                    </div>
                    <div className="services text-center">
                      <div className="icon mt-2 d-flex justify-content-center align-items-center"><span className="flaticon-handshake" /></div>
                      <div className="text media-body">
                        <h3>Portfolio Management</h3>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="ftco-section bg-light">
          <div className="container">
            <div className="row justify-content-center mb-5 pb-2">
              <div className="col-md-8 text-center heading-section ">
                <h2 className="mb-4"> Recent Announcement</h2>
                <p>Separated they live in. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4 ">
                <div className="blog-entry">
                  <a href="blog-single.html" className="block-20 d-flex align-items-end" style={{ backgroundImage: 'url(\'./images/bg_5.jpg\')' }}>

                    <div className="meta-date text-center p-2">
                      <span className="day">26</span>
                      <span className="mos">June</span>
                      <span className="yr">2019</span>
                    </div>
                  </a>
                  <div className="text bg-white p-4">
                    <h3 className="heading"><a href="#">Finance And Legal Working Streams Occur Throughout</a></h3>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <div className="d-flex align-items-center mt-4">
                      <p className="mb-0"><a href="#" className="btn btn-primary">Read More <span className="ion-ios-arrow-round-forward" /></a></p>
                      <p className="ml-auto mb-0">
                        <a href="#" className="mr-2">Admin</a>
                        <a href="#" className="meta-chat"><span className="icon-chat" /> 3</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 ">
                <div className="blog-entry">
                  <a href="blog-single.html" className="block-20 d-flex align-items-end" style={{ backgroundImage: 'url(\'./images/bg_2.jpg\')' }}>
                    <div className="meta-date text-center p-2">
                      <span className="day">26</span>
                      <span className="mos">June</span>
                      <span className="yr">2019</span>
                    </div>
                  </a>
                  <div className="text bg-white p-4">
                    <h3 className="heading"><a href="#">Finance And Legal Working Streams Occur Throughout</a></h3>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <div className="d-flex align-items-center mt-4">
                      <p className="mb-0"><a href="#" className="btn btn-primary">Read More <span className="ion-ios-arrow-round-forward" /></a></p>
                      <p className="ml-auto mb-0">
                        <a href="#" className="mr-2">Admin</a>
                        <a href="#" className="meta-chat"><span className="icon-chat" /> 3</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 ">
                <div className="blog-entry">
                  <a href="blog-single.html" className="block-20 d-flex align-items-end" style={{ backgroundImage: 'url(\'./images/bg_1.jpg\')' }}>
                    <div className="meta-date text-center p-2">
                      <span className="day">26</span>
                      <span className="mos">June</span>
                      <span className="yr">2019</span>
                    </div>
                  </a>
                  <div className="text bg-white p-4">
                    <h3 className="heading"><a href="#">Finance And Legal Working Streams Occur Throughout</a></h3>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    <div className="d-flex align-items-center mt-4">
                      <p className="mb-0"><a href="#" className="btn btn-primary">Read More <span className="ion-ios-arrow-round-forward" /></a></p>
                      <p className="ml-auto mb-0">
                        <a href="#" className="mr-2">Admin</a>
                        <a href="#" className="meta-chat"><span className="icon-chat" /> 3</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <Home />

      </div>
    );
  }
}
