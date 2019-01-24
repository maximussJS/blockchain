import React,{Component} from 'react'
import {getUserTransfers} from "../utils/req";
import {getUserKey, isAuthenticated} from "../utils/auth";
import ContentComponent from "../components/Content";


export default class UserTransfers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error : '',
            transfers : [],
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
                         const response = await getUserTransfers({
                             key: getUserKey()
                         })
                         if(response.success) {
                             this.setState({
                                 transfers: response.data,
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
        <ContentComponent items={this.state.transfers}
                          error={this.state.error}
                          loading={this.state.loading}/>
      )
    }
}