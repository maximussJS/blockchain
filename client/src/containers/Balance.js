import React,{Component} from 'react'
import BalanceComponent from '../components/Balance'
import {getTokenByKey} from "../utils/req"
import {getUserKey,getUserBalance, isAuthenticated, authenticate} from "../utils/auth"


export default class Balance extends Component {
     constructor(props) {
         super(props)
         this.state = {
             balance : null,
             error : '',
             loading : false
         }
     }

     componentDidMount() {
          if (isAuthenticated() && getUserKey() !== '') {
             if (!this.state.loading) {
                 this.setState({
                         loading: true
                 }, async () => {
                     try {
                         const response = await getTokenByKey({
                             key: getUserKey()
                         })
                         if(response.success) {
                             authenticate(response.token)
                             this.setState({
                                 balance: getUserBalance(),
                                 loading: false
                             })
                         }
                         else {
                             this.setState({
                                 loading: false
                             })
                             this.props.history.push('/login')
                         }
                     } catch (e) {
                         this.setState({
                             loading: false,
                             error: e.message
                         })
                     }
                 })
             }
         }
         else this.props.history.push('/login')
     }

     render() {
         return (
             <BalanceComponent balance={this.state.balance}
                      error={this.state.error}
                      loading={this.state.loading}/>
         )
     }
}