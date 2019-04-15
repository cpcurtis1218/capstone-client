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
        <p>{this.props.location.state ? this.props.location.state.message : ''}</p>
        <ul>
          {this.state.expenses.map(expense => (
            <li key={expense.id} className="btn">
              <Link to={'/expenses/' + expense.id} className="btn btn-warning m-1">{parseFloat(Math.round(expense.amount * 100) / 100).toFixed(2)}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Expenses
