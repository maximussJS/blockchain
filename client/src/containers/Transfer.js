import React,{Component} from 'react'
import {isAuthenticated, getUserKey, getUserBalance, authenticate} from '../utils/auth'
import {getTokenByKey, transfer} from '../utils/req'
import TransferForm from '../components/TransferForm'


export default class Transfer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            master: '',
            whom: '',
            amount: '',
            balance : '',
            error : '',
            loading: false
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onAmountChange = this.onAmountChange.bind(this)
        this.onWhomChange = this.onWhomChange.bind(this)
        this.onError = this.onError.bind(this)
    }

    componentDidMount() {
        if (isAuthenticated() && getUserKey() !== '') {
            if(!this.state.loading) {
                this.setState({
                        loading: true
                }, async () => {
                    try {
                        const response = await getTokenByKey({
                            key : getUserKey()
                        })
                        if(response.success) {
                            authenticate(response.token)
                            this.setState({
                                loading : false,
                                balance: getUserBalance(),
                                master: getUserKey()
                            })
                        }
                        else {
                            this.setState({
                                loading: false
                            })
                            this.props.history.push('/login')
                        }
                    }
                    catch (e) {
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

    onSubmit = async () => {
         try {
             const {master,whom,amount,balance} = this.state
             if(20 < whom.length < 8) this.onError('Invalid email')
             if(amount < 0) this.onError('Invalid amount')
             if(amount > balance) this.onError(`You have only ${balance}`)
             if(this.state.error === '') {
                 this.setState({
                     loading : true
                 })
                 const response = await transfer({
                     master: master,
                     whom: whom,
                     amount: amount
                 })
                 if(response.success) this.props.history.push('/')
                 else {
                     this.setState({
                         loading : false
                     })
                     this.onError(response.text)
                 }
             }
         }
         catch (e) {
             this.onError(e.message)
         }
    }

    onWhomChange(e) {
        this.setState({
            whom : e.target.value
        })
    }

    onAmountChange(e) {
        this.setState({
            amount : e.target.value
        })
    }

    onError(str) {
        this.setState({
            error : str
        })
    }

    render() {
        return (
            <TransferForm onSubmit={this.onSubmit}
                          onWhomChange={this.onWhomChange}
                          onAmountChange={this.onAmountChange}
                          balance={this.state.balance}
                          error={this.state.error}
                          loading={this.state.loading}/>
        )
    }
}