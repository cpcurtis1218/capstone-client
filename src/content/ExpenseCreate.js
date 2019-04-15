import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
// import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

class ExpenseCreate extends Component {
  constructor () {
    super()

    this.state = {
      expense: {
        amount: '',
        category: '',
        description: ''
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

    // destructuring the expense object
    const { expense } = this.state

    axios({
      url: `${apiUrl}/expenses`,
      method: 'post',
      data: { expense }
    })
      .then(response => this.setState({
        created: true,
        expense: response.data.expense }))
      .catch(() => this.setState({
        expense: { ...expense, amount: '', category: '', description: '' },
        message: 'Create failed, please fill out forms and try again.'
      }))
  }

  render () {
    const { expense, created, message } = this.state
    if (created) {
      return <Redirect to={{
        pathname: '/expenses',
        state: { message: 'Expense created.' }
      }}/>
    } else {
      const { amount, category, description } = expense
      return (
        <div>
          <h3>Create a new Expense!</h3>
          <form className="p-2" onSubmit={this.handleSubmit}>
            <label htmlFor="amount">Amount:</label>
            <input required={true} value={amount} type="number" name="amount" className="m-1" onChange={this.handleChange} />
            <label htmlFor="category">Category:</label>
            <input required={true} value={category} name="category" className="m-1" onChange={this.handleChange} />
            <label htmlFor="description">Description:</label>
            <input value={description} name="description" className="m-1" onChange={this.handleChange} />
            <button type="submit">Submit</button>
          </form>
          <p>{message}</p>
        </div>
      )
    }
  }
}

export default ExpenseCreate
