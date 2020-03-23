import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
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
            time: ''
        }
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

    render() {
        const Header = [
            {
                Header: 'Event Name',
                accessor: 'eventName',
            },
            {
                Header: 'Location',
                accessor: 'location',
            },
            {
                Header: '',
                accessor: 'userId.email'
            },
            {
                Header: 'Category',
                accessor: 'category'
            },
            {
                Header: 'Company',
                accessor: 'userId.company'
            },
            {
                Header: 'Title',
                accessor: 'userId.titleSpeaker'
            },
            {
                Header: 'Actions',
                sortable: false,
                accessor: '_id',
                Cell: props =>
                    <span>
                        <i className="fas fa-edit mr-2 text-info" onClick={this.edit.bind(this, props.value)} data-toggle="modal" data-target="#editAttendee" ></i>
                        <i className="fas fa-trash text-danger" data-toggle="modal" data-target="#deleteAttendee" onClick={() => this.setState({ deleteId: props.value })}></i>
                    </span>
            }
        ]
        if (!localStorage.getItem('Id')) return window.location.href = '/'
        return (
            <div>
                <Link to="/add" className="btn btn-primary" >Back</Link>
                this is list
            </div>
        )
    }
}
