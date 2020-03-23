import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const serverUrl = 'https://task1s.herokuapp.com/'

export default class List extends Component {

    constructor() {
        super();
        this.state = {
            eventName: '',
            location: '',
            members: '',
            detail: '',
            date: '',
            time: '',
            data: []
        }
    }

    componentDidMount = () => {
        axios({
            method: 'get',
            url: serverUrl + 'events/'
        }).then(res => {
            this.setState({
                data: res.data.data.event
            })
        }).catch(err => {
            console.log({ err })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    sumbit = (e) => {
        axios({
            method: 'post',
            url: serverUrl + ''
        })
    }

    edit(id) {
        console.log(id)
    }

    delete(id) {
        console.log(id)
        axios({
            method: 'delete',
            url: serverUrl + 'events/' + id
        }).then(res => {
            if (res.data.status === true) {
                this.componentDidMount()
            }
        }).catch(err => {
            console.log({ err })
        })
    }

    render() {
        if (!localStorage.getItem('Id')) return window.location.href = '/'
        return (
            <div className='container'>
                <Link to="/add" className="btn btn-primary mb-2 mt-2" >Go to Form</Link>
                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Location</th>
                                <th>Members</th>
                                <th>Detail</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(data =>
                                <tr key={data._id}>
                                    <td>{data.eventName}</td>
                                    <td>{data.location}</td>
                                    <td>{data.members}</td>
                                    <td>{data.detail}</td>
                                    <td>{moment.utc(data.date).format('DD-MM-YYYY')}</td>
                                    <td>{moment.utc(data.time).format('LT')}</td>
                                    <td><i className="fa fa-pencil btn btn-warning" onClick={this.edit.bind(this, data._id)}></i> <i className="fa fa-trash btn btn-danger mr-3" onClick={this.delete.bind(this, data._id)}></i></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
