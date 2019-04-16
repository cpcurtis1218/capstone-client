import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import messages from './messagesContent.js'

class ExpenseCreate extends Component {
  constructor () {
    super()

    this.state = {
      expense: {
        amount: '',
        category: '',
        description: '',
        chargeDate: ''
      },
      created: false,
      message: null
    }
  }

  handleChange = (event) => {
    this.setState({ expense: {
      ...this.state.expense, [event.target.name]: event.target.value
    } })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // destructuring the expense and props objects
    const { expense } = this.state
    const { alert } = this.props

    axios({
      url: `${apiUrl}/expenses`,
      method: 'post',
      data: { expense }
    })
      .then(() => alert(messages.createSuccess, true))
      .then(response => this.setState({
        created: true
      }))
      .catch(() => {
        this.setState({
          expense: { ...expense, amount: '', category: '', description: '' }
        })
        alert(messages.failure, false)
      })
  }

  render () {
    const { expense, created } = this.state
    if (created) {
      return <Redirect to={{
        pathname: '/expenses'
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

export default withRouter(ExpenseCreate)
