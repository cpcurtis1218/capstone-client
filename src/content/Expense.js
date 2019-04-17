import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import Spinner from 'react-bootstrap/Spinner'
import messages from './messagesContent.js'

class Expense extends Component {
  constructor () {
    super()

    this.state = {
      expense: null,
      redirect: false
    }
  }

  componentDidMount () {
    const { match, user, alert } = this.props

    axios({
      url: `${apiUrl}/expenses/${match.params.id}`,
      method: 'get',
      headers: {
        Authorization: 'Token token=' + user.token
      }
    })
      .then(response => this.setState({
        expense: response.data.expense
      }))
      .catch(() => alert(messages.failure, false))
  }

  handleDelete = id => {
    const { expense } = this.state
    const { alert, user } = this.props
    axios({
      url: `${apiUrl}/expenses/${expense.id}`,
      method: 'delete',
      headers: {
        Authorization: 'Token token=' + user.token
      }
    })
      .then(() => alert(messages.deleteSuccess, true))
      .then(() => this.setState({
        redirect: true }))
      .catch(() => {
        alert(messages.failure, false)
      })
  }

  render () {
    if (!this.state.expense) {
      return <Spinner animation="grow" className="m-3"/>
    } else if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/expenses'
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
        </div>
      )
    }
  }
}

export default withRouter(Expense)
