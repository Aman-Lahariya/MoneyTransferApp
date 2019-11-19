import React, {Component} from 'react'
import {createStackNavigator,createAppContainer} from 'react-navigation'
import SignUp from './screens/SignUp'
import SignIn from './screens/SignIn'
import Dashboard from './screens/Dashboard'
import PaymentContactDash from './screens/PaymentContactDash'
import PaymentModule from './screens/PaymentModule'
import PaymentDetails from './screens/PaymentDetails'
import Send from './screens/Send'
import TransactionPass from './screens/TransactionPassword'
import UpdateTransPass from './screens/UpdateTransPassword'

import * as Permissions from 'expo-permissions';

const RootStack = createStackNavigator(
  {
    signIn: SignIn,
    signUp: SignUp,
    dashboard: Dashboard,
    paymentContactDash: PaymentContactDash,
    paymentModule: PaymentModule,
    paymentDetails: PaymentDetails,
    send: Send,
    transactionPass: TransactionPass,
    updateTransPass: UpdateTransPass,
  },
  {
    initialRouteName:'signIn',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component{
  /* async askPermission(){
    const { status} = await Permissions.askAsync(
      Permissions.CONTACTS
    );
  
    if (status !== 'granted') {
      // Permission was denied...
      alert('Hey! You heve not enabled selected permissions');
      return;
    } 
  }*/
  render(){
    //this.askPermission();
    return(
      <AppContainer/>
    )
  }
}