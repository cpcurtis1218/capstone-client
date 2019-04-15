import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Link } from 'react-router-dom'

class Expenses extends Component {
  constructor () {
    super()

    this.state = {
      expenses: []
    }
  }

  componentDidMount () {
    console.log('expenses component mounted')
    axios.get(apiUrl + '/expenses')
      .then(response => this.setState({
        expenses: response.data.expenses
      }))
      .catch(console.log)
  }

  render () {
    return (
      <div>
        <h3>My Expenses</h3>
        <ul>
          {this.state.expenses.map(expense => (
            <li key={expense.id} className="">
              <Link to={'/expenses/' + expense.id} className="btn btn-warning m-1">{expense.amount}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Expenses
