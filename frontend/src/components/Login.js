import React, { Component } from 'react'
import axios from 'axios'
const serverUrl = 'https://task1s.herokuapp.com/'

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            password: '',
            error: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sumbit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: serverUrl + 'users/login/',
            data: {
                userName: this.state.userName,
                password: this.state.password
            }
        }).then((res) => {
            console.log(res)
            localStorage.setItem('Id', res.data.data.userId)
            window.location.href = '/add'
        }).catch(err => {
            console.log({ err })
            this.setState({
                error: err.response.data.message
            })
        })
    }

    render() {
        if(localStorage.getItem('Id')) return window.location.href = '/add'
        return (
            <div className="container">
                <form onSubmit={this.sumbit}>
                    <div className="form-group">
                        <label >User Name</label>
                        <input type="text" className="form-control" name="userName" required onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" name="password" required onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p>{this.state.error}</p>
            </div>
        )
    }
}
