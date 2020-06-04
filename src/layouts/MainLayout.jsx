/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBDropdownToggle, MDBDropdown, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import './MainLayout.scss';
import './icomoon.css';
import './style.css';
//import '../assets/css/style.css';
//import '../assets/css/icomoon.css';
import RouteConstants from '../utils/RouteConstants';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState((prevState) => ({
      collapse: !prevState.collapse
    }));
  }

  renderHeader() {
    return (
      <header>
        <div className="branch" style={{ height: 70 }}>
          <div className="bg-top navbar-light" style={{ background: "white" }}>
            <div className="container">
              <div className="row no-gutters d-flex align-items-center align-items-stretch">
                <div className="col-md-4 d-flex align-items-center">
                  <a className="navbar-brand" href="/home" style={{ fontSize: 30 }}> FinSys</a>
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
                          <span>Free Contact</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MDBNavbar color="elegant-color" dark expand="md">
          <MDBContainer>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem>
                  <MDBNavLink to="/home">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className="d-none d-md-inline">Equity</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu left='true'>
                      <MDBDropdownItem href={RouteConstants.stockCharts}>Stock charts</MDBDropdownItem>
                      <MDBDropdownItem href={RouteConstants.financeReports}>Financial reports</MDBDropdownItem>
                      <MDBDropdownItem href={RouteConstants.ggm}>GGM</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/fixed-income">Fix Income</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className="d-none d-md-inline">Forex</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu left='true'>
                      <MDBDropdownItem href={RouteConstants.forexCharts}>Forex charts</MDBDropdownItem>
                      <MDBDropdownItem href={RouteConstants.fxTool}>FX Tool</MDBDropdownItem>
                      <MDBDropdownItem href={RouteConstants.interestRateParity}>Interest Rate Parity</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/derivatives">Derivatives</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink to="/portfolio-management">Portfolio Management</MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </header>
    );
  }

  renderBody() {
    return (
      <MDBContainer className="main-container flex-fill m-0 p-0" fluid>
        {this.props.routes}
      </MDBContainer>
    );
  }

  renderFooter() {
    return (
      <footer className="ftco-footer ftco-bg-dark ftco-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-6 col-lg-3">
              <div className="ftco-footer-widget mb-5">
                <h2 className="ftco-heading-2">Have a Questions?</h2>
                <div className="block-23 mb-3">
                  <ul>
                    <li><span className="icon icon-map-marker"></span><span className="text">Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, Thành phố Hồ Chí Minh</span></li>
                    <li><a href="#"><span className="icon icon-phone"></span><span className="text">+2 392 3929 210</span></a></li>
                    <li><a href="#"><span className="icon icon-envelope"></span><span className="text">info@yourdomain.com</span></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="ftco-footer-widget mb-5">
                <h2 className="ftco-heading-2">Recent Blog</h2>
                <div className="block-21 mb-4 d-flex">
                  <a className="blog-img mr-4" style={{backgroundImage:`url(${"../public/image/background-img.jpg"})`}}></a>
                  <div className="text">
                    <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                    <div className="meta">
                      <div><a href="#"><span className="icon-calendar"></span> June 27, 2019</a></div>
                      <div><a href="#"><span className="icon-person"></span> Admin</a></div>
                      <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                    </div>
                  </div>
                </div>
                <div className="block-21 mb-5 d-flex">
                  <a className="blog-img mr-4" style={{backgroundImage:`url(${"../public/image/background-img.jpg"})`}}></a>
                  <div className="text">
                    <h3 className="heading"><a href="#">Even the all-powerful Pointing has no control about</a></h3>
                    <div className="meta">
                      <div><a href="#"><span className="icon-calendar"></span> June 27, 2019</a></div>
                      <div><a href="#"><span className="icon-person"></span> Admin</a></div>
                      <div><a href="#"><span className="icon-chat"></span> 19</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="ftco-footer-widget mb-5 ml-md-4">
                <h2 className="ftco-heading-2">Links</h2>
                <ul className="list-unstyled">
                  <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Home</a></li>
                  <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>About</a></li>
                  <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Services</a></li>
                  <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Projects</a></li>
                  <li><a href="#"><span className="ion-ios-arrow-round-forward mr-2"></span>Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="ftco-footer-widget mb-5">
              <form action="#" className="subscribe-form">
                <div className="form-group">
                  <input type="text" className="form-control mb-2 text-center" placeholder="Enter email address"/>
                  <input type="submit" value="Subscribe" className="form-control submit px-3"/>
                </div>
              </form>
                  </div>
                  <div className="ftco-footer-widget mb-5">
                    <h2 className="ftco-heading-2 mb-0">Connect With Us</h2>
                    <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                      <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                      <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                      <li className="ftco-animate"><a href="#"><span className="icon-instagram"></span></a></li>
                    </ul>
                  </div>
          </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-center">

              <p>
                Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved |
                   </p>
                </div>
              </div>
            </div>
    </footer>
    );
  }
  render() {
    return (
      <article className="w-100 h-100 d-flex flex-column overflow-hidden">
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
          </article>
    );
  }
}
