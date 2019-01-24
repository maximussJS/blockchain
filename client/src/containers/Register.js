import React, {Component} from 'react'
import RegisterForm from '../components/RegisterForm'
import {register} from '../utils/req'
import {getLimit} from "../utils/obj"
import {authenticate} from '../utils/auth'


export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            email : '',
            password : '',
            confirm : '',
            country : '',
            age : null,
            error : '',
            loading : false,
            limit : []
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onConfirmChange = this.onConfirmChange.bind(this)
        this.onAgeChange = this.onAgeChange.bind(this)
        this.onCountryChange = this.onCountryChange.bind(this)
        this.onError = this.onError.bind(this)
    }

    componentDidMount() {
        this.setState({
            limit : getLimit()
        })
    }

    onSubmit = async () => {
        try {
            const {name,email,password,confirm,country,age} = this.state
            if(name.length < 8) this.onError('Invalid name')
            if(email.length < 8) this.onError('Invalid email')
            if(password.length < 8) this.onError('Invalid password')
            if(confirm.length < 8) this.onError('Invalid repeat password')
            if(country.length < 3) this.onError('Invalid country')
            if(age < 5) this.onError('Invalid age')
            if (password !== confirm) this.onError('Password do not match')
            if(this.state.error === '') {
                this.setState({
                    loading : true
                })
                const response = await register({
                    name : name,
                    email : email,
                    password : password,
                    age : age == null ? 18 : age,
                    country : country
                })
                if(response.success) {
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

    onNameChange(e) {
      this.setState({
         name : e.target.value
      })
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

    onConfirmChange(e) {
      this.setState({
          confirm: e.target.value
      })
    }

    onAgeChange(e) {
      this.setState({
        age : e.target.value
      })
    }

    onCountryChange(e) {
      this.setState({
        country : e.target.value
      })
    }

    onError(str) {
        this.setState({
            error : str
        })
    }

    render() {
      return (
         <RegisterForm onSubmit={this.onSubmit}
                       onNameChange={this.onNameChange}
                       onEmailChange={this.onEmailChange}
                       onPasswordChange={this.onPasswordChange}
                       onConfirmChange={this.onConfirmChange}
                       onAgeChange={this.onAgeChange}
                       onCountryChange={this.onCountryChange}
                       limit={this.state.limit}
                       loading={this.state.loading}
                       error={this.state.error}/>
      )
    }
}