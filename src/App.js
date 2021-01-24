import React from 'react';
import CategoryInterface from './components/category/CategoryInteface'
import DisplayAll from './components/category/DisplayAll' 
import DisplayAllFormat from './components/category/DisplayAllFormat'
import BrandInterface from './components/brand/BrandInterface'
import DisplayAllBrand from './components/brand/DisplayAllBrand'
import OutletInterface from './components/outlets/OutletInterface'
import DisplayAllOutlets from './components/outlets/DisplayAllOutlets'
import DisplayAllModel from './components/model/DisplayAllModel'
import ModelInterface from './components/model/ModelInterface'
import SignIn from './components/admin/SignIn'
import Dashboard from './components/admin/Dashboard'
import ProductPicture from './components/productpicture/ProductPicture'
import DisplayProductPicture from './components/productpicture/DisplayProductPicture'

import VendorLogin from './components/vendorlogin/Login'
import ViewListofProducts from './components/clientview/ViewListofProducts'
import FirstPage from './components/clientview/FirstPage'
import ProductView from './components/clientview/ProductView'
import ShowCart from './components/clientview/ShowCart'
import SignInClient from './components/clientview/SignInClient'
import SignInUserForm from './components/clientview/SignInUserForm'
import ShowCartWithAddress from './components/clientview/ShowCartWithAddress'
import PaymentGateway from './components/PaymentGateway'

import VendorDashboard from './components/vendorlogin/VendorDashboard'
import MainPage from './components/clientview/MainPage'
import { BrowserRouter as Router,HashRouter, Route,NavLink,Redirect } from "react-router-dom";
function App(props) {
  return (
    <div>

     <Router>
       
       <Route exact strict component={CategoryInterface} path="/CategoryInterface" history={props.history} />
       <Route exact strict component={DisplayAllFormat} path="/DisplayAllFormat" history={props.history} />
       <Route exact strict component={BrandInterface} path="/BrandInterface"  history={props.history}/>
       <Route exact strict component={BrandInterface} path="/BrandInterface"  history={props.history}/>
       <Route exact strict component={DisplayAllBrand} path="/DisplayAllBrand" history={props.history} />
       <Route exact strict component={OutletInterface} path="/OutletInterface" history={props.history} />
       <Route exact strict component={DisplayAllOutlets} path="/DisplayAllOutlets" history={props.history} />
       <Route exact strict component={SignIn} path="/SignIn"     history={props.history} />
       <Route exact strict component={Dashboard} path="/Dashboard" history={props.history} />
       <Route exact strict component={ModelInterface} path="/BrandInterface" history={props.history} />
       <Route exact strict component={DisplayAllModel} path="/DisplayAllBrand" history={props.history} />
       <Route exact strict component={VendorLogin} path="/VendorLogin" history={props.history} />
       <Route exact strict component={VendorDashboard} path="/VendorDashboard" history={props.history} />
       <Route exact strict component={ProductPicture} path="/ProductPicture" history={props.history} />
       <Route exact strict component={MainPage} path="/MainPage" history={props.history} />
       <Route exact strict component={FirstPage} path="/FirstPage" history={props.history} />
       <Route exact strict component={ViewListofProducts} path="/ViewListofProducts/:cid" history={props.history} />
       <Route exact strict component={ProductView} path="/ProductView/:pid" history={props.history} />
       <Route exact strict component={ShowCart} path="/ShowCart" history={props.history} />
       <Route exact strict component={SignInClient} path="/SignInClient" history={props.history} />
       <Route exact strict component={SignInUserForm} path="/SignInUserForm" history={props.history} />
       <Route exact strict component={ShowCartWithAddress} path="/ShowCartWithAddress" history={props.history} />
       <Route exact strict component={PaymentGateway} path="/PaymentGateway" history={props.history} />
       
     </Router>
  </div>
  );
}

export default App;
