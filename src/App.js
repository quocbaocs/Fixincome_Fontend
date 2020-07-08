/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect
} from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';


import HomePage from './pages/home/HomePage';
import FinanceChartPage from './pages/chart/FinanceChartPage';
import MainLayout from './layouts/MainLayout';
import PortfolioManagement from './pages/portfolio-management/PortfolioManagement';
import ForexChartPage from './pages/Forex/ForexChartPage';
import GGM from './pages/GGM/GGM';
import RouteConstants from './utils/RouteConstants';
import InterestRateParityPage from './pages/Forex/InterestRateParityPage';
import FXToolPage from './pages/Forex/FXToolPage';
import HM from './pages/H-Model/HM';
import TwoStage from './pages/2-stage/TwoStage';
import Fixedincome from './pages/fixedincome/Fixedincome';
import Maincaculator from './pages/CaculatorBonds/Maincaculator';
import FinancialReports from './pages/financial-reports/FinancialReports';
import Login from './pages/login/Login';




function App() {
  const routes = (
    <Switch>
      <Route path="/home" component={HomePage} />
      <Route path={RouteConstants.fixincome} component={Fixedincome}/>
      <Route path={RouteConstants.caculatorbons} component={Maincaculator}/>
      <Route path={RouteConstants.stockCharts} component={FinanceChartPage} />
      <Route path={RouteConstants.ggm} component={GGM} />
      <Route path={RouteConstants.financeReports} component={FinancialReports} />
      <Route path={RouteConstants.hm} component={HM} />
      <Route path={RouteConstants.tsm} component={TwoStage} />
      <Route path={RouteConstants.forexCharts} component={ForexChartPage} />
      <Route path={RouteConstants.interestRateParity} component={InterestRateParityPage} />
      <Route path={RouteConstants.fxTool} component={FXToolPage} />
      <Route path="/portfolio-management" component={PortfolioManagement} />
      <Route path={RouteConstants.login} component={Login} />
      <Redirect to="/home" />
    </Switch>
  );

  return (
    <BrowserRouter>
      <MainLayout routes={routes} />
    </BrowserRouter>
  );
}

export default App;
