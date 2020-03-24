import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

const serverUrl = 'https://task1s.herokuapp.com/'

export default class List extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            eventName: '',
            location: '',
            members: '',
            detail: '',
            date: '',
            time: '',
            data: [],
            toggle: false,
            error: ''
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
        this.setState({
            toggle: true
        })
        axios({
            method: 'get',
            url: serverUrl + 'events/' + id
        }).then(res => {
            console.log(moment.utc(res.data.data.event[0].time).format('LT'))
            this.setState({
                id: res.data.data.event[0]._id,
                eventName: res.data.data.event[0].eventName,
                location: res.data.data.event[0].location,
                members: res.data.data.event[0].members,
                detail: res.data.data.event[0].detail,
                date: moment.utc(res.data.data.event[0].date).format('YYYY-MM-DD'),
                time: moment.utc(res.data.data.event[0].time).format('hh:mm'),
            })
        }).catch(err => {
            console.log({ err })
        })
    }

    update = (e) => {
        e.preventDefault()
        axios({
            method: 'put',
            url: serverUrl + 'events/' + this.state.id,
            data: {
                eventName: this.state.eventName,
                location: this.state.location,
                members: this.state.members,
                detail: this.state.detail,
                date: this.state.date,
                time: this.state.date + ' ' + this.state.time,
            }
        }).then(res => {
            if (res.data.status === true) {
                this.setState({ toggle: false })
                this.componentDidMount()
            }
        }).catch(err => {
            console.log({ err })
        })
    }

    delete = (id) => {
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
        const { eventName, location, members, detail, date, time } = this.state
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
                {this.state.toggle === true
                    ?
                    <div className="mt-5">
                        <form onSubmit={this.update}>
                            <div className="form-group">
                                <label >Event Name</label>
                                <input type="text" className="form-control" name="eventName" value={eventName} required onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label >Location</label>
                                <input type="text" className="form-control" name="location" value={location} required onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>members</label>
                                <input type="number" className="form-control" name="members" value={members} required onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label >Detail</label>
                                <input type="text" className="form-control" name="detail" value={detail} required onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input type="date" className="form-control" name="date" value={date} required onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input type="time" className="form-control" name="time" value={time} required onChange={this.handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                        <p>{this.state.error}</p>
                    </div>
                    :
                    <div />
                }
            </div>
        )
    }
}
