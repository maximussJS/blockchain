import React from 'react'
import {Route, Switch} from "react-router-dom"
import Layout from '../containers/Layout'
import Content from '../containers/Content'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Transfer from '../containers/Transfer'
import Logout from '../containers/Logout'
import Balance from '../containers/Balance'
import UserTransfers from '../containers/UserTransfers'
import Profile from '../containers/Profile'
import About from '../components/About'
import '../css/App.css'


const App = () =>
    <Layout>
       <Switch>
         <Route exact component={Content} path='/'/>
         <Route exact component={Login} path='/login'/>
         <Route exact component={Logout} path='/logout'/>
         <Route exact component={Register} path='/register'/>
         <Route exact component={Transfer} path='/transfer'/>
         <Route exact component={UserTransfers} path='/transfers'/>
         <Route exact component={Balance} path='/balance'/>
         <Route exact component={Profile} path='/profile'/>
         <Route exact component={About} path='/about'/>
       </Switch>
    </Layout>

export default App