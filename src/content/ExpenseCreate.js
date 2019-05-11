import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import messages from './messagesContent.js'
import { Dropdown, DropdownButton } from 'react-bootstrap'

class ExpenseCreate extends Component {
  constructor () {
    super()

    this.state = {
      expense: {
        amount: '',
        category: 'Choose Category',
        description: '',
        date: ''
      },
      created: false,
      message: null
    }
  }

  componentDidMount () {
    // if the location.state prop exists, set this.state.expense.date to the date
    const { state } = this.props.location
    if (state) {
      this.setState({ expense: {
        ...this.state.expense, date: state.date
      } })
    }
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

    // destructuring the expense and props objects
    const { expense } = this.state
    const { alert, user } = this.props

    axios({
      url: `${apiUrl}/expenses`,
      method: 'post',
      headers: {
        Authorization: 'Token token=' + user.token
      },
      data: { expense }
    })
      .then(() => alert(messages.createSuccess, true))
      .then(response => this.setState({
        created: true
      }))
      .catch(() => {
        this.setState({
          expense: { ...expense, amount: '', category: '', description: '', date: '' }
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
      const { amount, category, description, date } = expense
      return (
        <div className="expense-form">
          <h3>Create a new Expense!</h3>
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
                <input value={description} name="description" onChange={this.handleChange} />
              </span>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
  }
}

export default withRouter(ExpenseCreate)
