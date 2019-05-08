import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import messages from './messagesContent.js'
import { Dropdown, DropdownButton } from 'react-bootstrap'

class ExpenseEdit extends Component {
  constructor () {
    super()

    this.state = {
      expense: {
        amount: '',
        category: '',
        description: '',
        date: ''
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

  onSelect = (value) => {
    this.setState({ expense: {
      ...this.state.expense, category: value
    } })
  }

  handleSubmit = (event) => {
    event.preventDefault()

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
      const { amount, category, description, date } = expense
      return (
        <div className="expense-form">
          <h3>Update Expense</h3>
          <form className="p-2" onSubmit={this.handleSubmit}>
            <div className="m-2">
              <label htmlFor="date">Date:</label>
              <span className="expenses-amount">
                <input required={true} value={date} type="date" name="date" onChange={this.handleChange} />
              </span>
            </div>
            <div className="m-2">
              <label htmlFor="amount">Amount: $</label>
              <span className="expenses-amount">
                <input required={true} value={amount} type="number" name="amount" onChange={this.handleChange} />
              </span>
            </div>
            <div className="m-2">
              <label htmlFor="category">Category:</label>
              <span className="expenses-amount">
                <DropdownButton id="category-dropdown" title={category} name="category">
                  <Dropdown.Header>Choose Category</Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="Food" onSelect={this.onSelect}>Food</Dropdown.Item>
                  <Dropdown.Item eventKey="Rent" onSelect={this.onSelect}>Rent</Dropdown.Item>
                  <Dropdown.Item eventKey="Bill" onSelect={this.onSelect}>Bill</Dropdown.Item>
                  <Dropdown.Item eventKey="Other" onSelect={this.onSelect}>Other</Dropdown.Item>
                </DropdownButton>
              </span>
            </div>
            <div className="m-2">
              <label htmlFor="description">Description:</label>
              <span className="expenses-amount">
                <input value={description || ''} placeholder="Description" name="description" onChange={this.handleChange} />
              </span>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
  }
}

export default withRouter(ExpenseEdit)
