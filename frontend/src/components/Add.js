import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const serverUrl = 'https://task1s.herokuapp.com/'

export default class Add extends Component {
    constructor() {
        super();
        this.state = {
            eventName: '',
            location: '',
            members: '',
            detail: '',
            date: '',
            time: '',
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
            url: serverUrl + 'events/',
            data: {
                eventName: this.state.eventName,
                location: this.state.location,
                members: this.state.members,
                detail: this.state.detail,
                date: this.state.date,
                time: this.state.date + ' ' + this.state.time
            }
        }).then(res => {
            if (res) {
                window.location.href = "/list"
            }
        }).catch(err => {
            console.log({ err })
        })
    }

    render() {
        if (!localStorage.getItem('Id')) return window.location.href = '/'
        return (
            <div className='container'>
                <Link to="/list" className="btn btn-primary mt-3 mb-3" >Go to List</Link>
                <div>
                    <form onSubmit={this.sumbit}>
                        <div className="form-group">
                            <label >Event Name</label>
                            <input type="text" className="form-control" name="eventName" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label >Location</label>
                            <input type="text" className="form-control" name="location" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>members</label>
                            <input type="number" className="form-control" name="members" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label >Detail</label>
                            <input type="text" className="form-control" name="detail" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" className="form-control" name="date" required onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <input type="time" className="form-control" name="time" required onChange={this.handleChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <p>{this.state.error}</p>
                </div>
            </div>
        )
    }
}