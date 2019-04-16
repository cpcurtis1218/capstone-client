import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'

class Expense extends Component {
  constructor () {
    super()

    this.state = {
      expense: null,
      redirect: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/expenses/${id}`)
      .then(response => this.setState({
        expense: response.data.expense
      }))
      .catch(console.log)
  }

  handleDelete = id => {
    axios.delete(apiUrl + '/expenses/' + id)
      .then(() => this.setState({
        redirect: true }))
      .catch(console.log)
  }

  render () {
    if (!this.state.expense) {
      return <Spinner animation="grow" className="m-3"/>
    } else if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/expenses',
        state: { message: 'Expense was deleted.' }
      }} />
    } else {
      const { amount, category, description, chargeDate, id } = this.state.expense
      return (
        <div className="m-2 p-2 bg-light shadow-lg">
          <h3>{chargeDate}</h3>
          <p>${parseFloat(Math.round(amount * 100) / 100).toFixed(2)}</p>
          <p>Category: {category}</p>
          <p>Description: {description}</p>
          <button onClick={() => { this.handleDelete(id) }}>Delete</button>
          <Link to={this.props.match.url + '/edit'}><button className="m-2">Edit</button></Link>
          <p>{this.props.location.state ? this.props.location.state.message : ''}</p>
        </div>
      )
    }
  }
}

export default Expense
