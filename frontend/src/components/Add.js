import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Add extends Component {
    render() {
        return (
            <div>
                <Link to="/list" className="btn btn-primary" >Back</Link>
                this is add
            </div>
        )
    }
}