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
      loading: true,
      date: null
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
    const { expenses, loading, date } = this.state
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
    } else if (date) {
      // filter the expenses array to find dates that match
      const dateChosen = expenses.filter(expense => expense.date === date)
      // calculate the total amout for specified date
      const total = (arr) => {
        let acc = 0.00
        for (let i = 0; i < arr.length; i++) {
          acc = parseFloat(acc) + parseFloat(arr[i].amount)
        }
        // return the accumulator, rounded to 2 decimal places
        return parseFloat(Math.round(acc * 100) / 100).toFixed(2)
      }
      // save the total for the specified date as the variable dayTotal
      const dayTotal = total(dateChosen)
      return (
        <React.Fragment>
          <h3 className="my-expenses">My Expenses</h3>
          <div className="expenses-div row">
            <div className="col-6">
              <Calendar className="calendar" onChange={this.onChange}/>
            </div>
            <ul className="col-6">
              {dateChosen.map(expense => (
                <li key={expense.id} className="expenses">
                  <Link to={'/expenses/' + expense.id}><button className="expenses-btn mr-1">{expense.date}</button></Link>
                  {expense.category}
                  <span className="expenses-amount">${parseFloat(Math.round(expense.amount * 100) / 100).toFixed(2)}</span>
                </li>
              ))}
              <br/>
              <p className="day-total pl-3">{date}    Total: <span>${dayTotal}</span></p>
            </ul>
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <h3 className="my-expenses">My Expenses</h3>
          <div className="expenses-div row">
            <div className="col-6">
              <Calendar className="calendar" onChange={this.onChange}/>
            </div>
            <ul className="col-6">
              {expenses.map(expense => (
                <li key={expense.id} className="expenses">
                  <Link to={'/expenses/' + expense.id}><button className="expenses-btn mr-1">{expense.date}</button></Link>
                  {expense.category}
                  <span className="expenses-amount">${parseFloat(Math.round(expense.amount * 100) / 100).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default Expenses
