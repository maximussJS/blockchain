import React, {Component} from 'react'
import ContentComponent from '../components/Content'
import {getAllTransfers} from "../utils/req";

export default class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error : '',
            transfers : [],
            loading : false
        }
    }

    componentDidMount() {
        if(!this.state.loading) {
            this.setState({
                loading: true
            }, async () => {
                try {
                    const response = await getAllTransfers()
                    if (response.success){
                        this.setState({
                            transfers : response.data,
                            loading : false
                        })
                    }
                    else {
                        this.setState({
                            loading: false
                        })
                    }
                }
                catch (e) {
                    this.setState({
                        loading: false,
                        error: e.message
                    })
                }
              }
            )
        }
    }

    render() {
      return (
        <ContentComponent items={this.state.transfers.reverse()}
                          error={this.state.error}
                          loading={this.state.loading}/>
      )
    }
}