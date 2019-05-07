import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'
import messages from './messagesContent.js'
import Spinner from 'react-bootstrap/Spinner'
import Calendar from 'react-calendar'

class Expenses extends Component {
  constructor () {
    super()

    this.state = {
      expenses: [],
      loading: true
    }
  }

  componentDidMount () {
    const { alert, user } = this.props

    axios({
      url: `${apiUrl}/expenses`,
      method: 'get',
      headers: {
        Authorization: 'Token token=' + user.token
      }
    })
      .then(response => this.setState({
        expenses: response.data.expenses,
        loading: false
      }))
      .catch(() => alert(messages.failure, false))
  }

  onChange = dateObj => {
    // changing date object to string, removing comma, splitting on the /
    const dateArray = dateObj.toLocaleString().split(' ')[0].replace(',', '').split('/')
    const orderedDateArray = []
    // reordering date so it is same format as user input
    orderedDateArray.push(dateArray[2], dateArray[0], dateArray[1])
    // conditional to add a 0 in front if month is single digit
    if (orderedDateArray[1].length === 1) {
      orderedDateArray[1] = '0' + orderedDateArray[1]
      console.log('new orderedDateArray[1] is', orderedDateArray[1])
    }
    // conditional to add 0 in front if day is single digit
    if (orderedDateArray[2].length === 1) {
      orderedDateArray[2] = '0' + orderedDateArray[2]
    }
    // joining the array with - to match user input
    const date = orderedDateArray.join('-')
    return (
      this.setState({ date }),
      console.log('date is', this.state.date)
    )
  }

  render () {
    const { expenses, loading } = this.state
    if (loading) {
      return (
        <div><Spinner animation="grow" className="m-3"/></div>
      )
    } else if (!expenses.length) {
      return (
        <div>
          <h3>My Expenses</h3>
          <h4>No expenses yet, please click <Link to={'/expenses-create'}>here</Link> to add a new expense.</h4>
        </div>
      )
    } else {
      return (
        <div className="expenses-div">
          <h3>My Expenses</h3>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <Calendar className="calendar" onChange={this.onChange}/>
              </div>
              <ul className="col-6">
                {expenses.map(expense => (
                  <li key={expense.id} className="expenses">
                    <div className="">
                      <Link to={'/expenses/' + expense.id}><button className="expenses-btn">{expense.date}</button></Link>
                      <span className="expenses-amount">${parseFloat(Math.round(expense.amount * 100) / 100).toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Expenses
