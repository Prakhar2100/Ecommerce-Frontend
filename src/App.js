import React from 'react';
import HomeScreen from './components/HomeScreen';
import Header from './components/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import ItemScreen from './components/ItemScreen';
import CartScreen from './components/CartScreen';
import SigninScreen from './components/SigninScreen';
import RegisterScreen from './components/RegisterScreen';
import ShippingScreen from './components/ShippingScreen';
import PaymentScreen from './components/PaymentScreen';
import PlaceOrder from './components/OrderScreen';
import OrderDetails from './components/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/signin' component={SigninScreen} />
          <Route path='/item/:id' component={ItemScreen} />
          <Route path='/cart/:id?' component={CartScreen} /> 
          <Route path='/order/:id' component={OrderDetails} />
          <Route path='/register' component={RegisterScreen} /> 
          <Route path="/shipping" component={ShippingScreen} />
          <Route path='/' component={HomeScreen} exact/>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;