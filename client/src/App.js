
import React,{useEffect} from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';



import './App.css';



import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import SignInAndSignUpPage from './pages/signin-signup page/signin-signup.component';

import Header from './components/header/header.component';



import {connect} from 'react-redux'


import {selectCurrentUser} from './redux/user/user.selectors'


import CheckoutPage from './pages/checkout/checkout.component'

import{checkUserSession} from './redux/user/user.action'

import { createStructuredSelector } from 'reselect';



const App= ({checkUserSession,currentUser})=>{


  useEffect(()=>{
    checkUserSession()
  },[checkUserSession])



    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray:selectCollectionsForPreview
});

const mapDispatchToProps = dispatch => ({
  checkUserSession:()=>dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
