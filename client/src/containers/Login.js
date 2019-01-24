import React, {Component} from 'react'
import LoginForm from '../components/LoginForm'
import {login} from '../utils/req'
import {authenticate} from '../utils/auth'


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            loading : false,
            error : ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onError = this.onError.bind(this)
    }

    onSubmit = async () => {
         try {
             const {email,password} = this.state
             if(20 < email.length < 8) this.onError('Invalid email')
             if(20 < password.length < 8) this.onError('Invalid password')
             if (this.state.error === '') {
                 this.setState({
                     loading: true
                 })
                 const response = await login({
                     email: email,
                     password: password
                 })
                 if (response.success) {
                     authenticate(response.token)
                     this.props.history.push('/')
                 }
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

    onEmailChange(e) {
        this.setState({
           email : e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
          password : e.target.value
        })
    }

    onError(str) {
        this.setState({
            error : str
        })
    }

    render() {
        return (
            <LoginForm onSubmit={this.onSubmit}
                       onPasswordChange={this.onPasswordChange}
                       onEmailChange={this.onEmailChange}
                       error={this.state.error}
                       loading={this.state.loading}/>
        )
    }
}