import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'
import messages from './messagesContent.js'
import Spinner from 'react-bootstrap/Spinner'

class Expenses extends Component {
  constructor () {
    super()

    this.state = {
      expenses: [],
      loading: true
    }
  }

  componentDidMount () {
    const { alert } = this.props
    console.log('expenses component mounted')
    axios.get(apiUrl + '/expenses')
      .then(response => this.setState({
        expenses: response.data.expenses,
        loading: false
      }))
      .catch(() => alert(messages.failure, false))
  }

  render () {
    const { expenses, loading } = this.state
    if (loading) {
      return <Spinner animation="grow" className="m-3"/>
    } else if (!expenses.length) {
      return (
        <div>
          <h3>My Expenses</h3>
          <h4>No expenses yet, please click <Link to={'/expenses-create'}>here</Link> to add a new expense.</h4>
        </div>
      )
    } else {
      return (
        <div>
          <h3>My Expenses</h3>
          <ul>
            {this.state.expenses.map(expense => (
              <li key={expense.id} className="expenses">
                <Link to={'/expenses/' + expense.id} className="btn btn-warning m-1">{expense.chargeDate}</Link>
                <p>Amount: ${parseFloat(Math.round(expense.amount * 100) / 100).toFixed(2)}</p>
                <p>Category: {expense.category}</p>
                <p>Description: {expense.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
}

export default Expenses
