import React, { Suspense } from 'react';
import { Route, Router, Switch } from "react-router-dom"
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import ProductsInfoPage from './views/CategoryPage/ProductsInfoPage';
import DetailPage from './views/DetailPage/DetailPage';
import ReservationPage from './views/ReservationPage/ReservationPage';
import MyReservationPage from './views/ReservationPage/MyReservationPage';
import ReviewEdit from './views/ReservationPage/ReviewEdit';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px',minHeight: 'calc(100vh - 80px)', height: '100%'}}>
        <Switch>
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/detail/:productId" component={Auth(DetailPage, null)}/>
          <Route path="/reservation" component={Auth(ReservationPage, true)}/>
          <Route exact path="/myReservation/:user" component={Auth(MyReservationPage, true)}/>
          <Route exact path="/reviewEdit/" component={Auth(ReviewEdit, true)}/>
          <Route path="/" component={Auth(LandingPage, null)}/>
        </Switch>
        <Route path="/category" component={ProductsInfoPage}/>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
