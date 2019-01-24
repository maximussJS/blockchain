import React,{Component} from 'react'
import ProfileComponent from '../components/Profile'
import {isAuthenticated, authenticate, getUser, getUserKey, deauthenticate} from '../utils/auth'
import {getTokenByKey, updateUser, deleteUser} from '../utils/req'
import {getLimit} from "../utils/obj"


export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            email : '',
            age : null,
            country : '',
            balance : null,
            limit : [],
            keyword : '',
            error : '',
            loading : false,
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onNameChange = this.onNameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onAgeChange = this.onAgeChange.bind(this)
        this.onCountryChange = this.onCountryChange.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onError = this.onError.bind(this)
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
                             const user = getUser()
                             this.setState({
                                 name : user.name,
                                 email : user.email,
                                 age : user.age,
                                 country : user.country,
                                 balance : user.balance,
                                 keyword : getUserKey(),
                                 limit : getLimit(),
                                 loading : false
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

    onSubmit = async () => {
        try {
            const {name,email,country,age} = this.state
            if(name.length < 8) this.onError('Invalid name')
            if(email.length < 8) this.onError('Invalid email')
            if(country.length < 3) this.onError('Invalid country')
            if(age < 5) this.onError('Invalid age')
            if(this.state.error === '') {
                const user = getUser()
                let data = {}
                if (name !== user.name) data.name = name
                if (email !== user.email) data.email = email
                if (country !== user.country) data.country = country
                if (age !== user.age) data.age = age
                if (Object.keys(data).length === 0) this.onError('Nothing to change')
                if(this.state.error === '') {
                    this.setState({
                        loading : true
                    })
                    const response = await updateUser({
                        key : getUserKey(),
                        update : data
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
        }
        catch (e) {
            this.onError(e.message)
        }
    }

    onDelete = async () => {
        try {
            this.setState({
                loading : true
            })
            const response = await deleteUser({
                key : getUserKey()
            })
            if(response.success) {
                deauthenticate()
                this.props.history.push('/login')
            }
            else {
                this.setState({
                    loading : false
                })
                this.onError(response.text)
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
            <ProfileComponent onSubmit={this.onSubmit}
                              onNameChange={this.onNameChange}
                              onEmailChange={this.onEmailChange}
                              onAgeChange={this.onAgeChange}
                              onCountryChange={this.onCountryChange}
                              onDelete={this.onDelete}
                              name={this.state.name}
                              email={this.state.email}
                              age={this.state.age}
                              country={this.state.country}
                              balance={this.state.balance}
                              keyword={this.state.keyword}
                              limit={this.state.limit}
                              error={this.state.error}
                              loading={this.state.loading}/>
        )
    }
}