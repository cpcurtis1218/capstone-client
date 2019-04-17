import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import messages from './messagesContent.js'

class ExpenseEdit extends Component {
  constructor () {
    super()

    this.state = {
      expense: {
        amount: '',
        category: '',
        description: '',
        chargeDate: ''
      },
      updated: false
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

  handleChange = (event) => {
    this.setState({ expense: {
      ...this.state.expense, [event.target.name]: event.target.value
    } })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log('this.props is', this.props)

    // destructuring the expense object
    const { expense } = this.state
    const { alert, user } = this.props

    axios({
      url: `${apiUrl}/expenses/${expense.id}`,
      method: 'patch',
      headers: {
        Authorization: 'Token token=' + user.token
      },
      data: { expense }
    })
      .then(() => alert(messages.editSuccess, true))
      .then(() => this.setState({ updated: true }))
      .catch(() => {
        this.setState({
          expense: { ...expense, amount: '', category: '', description: '', charge_date: '' },
          message: 'Update failed, please fill out forms and try again.'
        })
        alert(messages.failure, false)
      })
  }

  render () {
    const { expense, updated } = this.state
    if (updated) {
      return <Redirect to={{
        pathname: `/expenses/${expense.id}`
      }}/>
    } else {
      const { amount, category, description, chargeDate } = expense
      return (
        <div>
          <h3>Create a new Expense!</h3>
          <form className="p-2" onSubmit={this.handleSubmit}>
            <label htmlFor="date">Date:</label>
            <input required={true} value={chargeDate} type="date" name="chargeDate" className="m-1" onChange={this.handleChange} />
            <label htmlFor="amount">Amount: $</label>
            <input required={true} value={amount} type="number" name="amount" className="m-1" onChange={this.handleChange} />
            <label htmlFor="category">Category:</label>
            <input required={true} value={category} name="category" className="m-1" onChange={this.handleChange} />
            <label htmlFor="description">Description:</label>
            <input value={description} name="description" className="m-1" onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
  }
}

export default withRouter(ExpenseEdit)
