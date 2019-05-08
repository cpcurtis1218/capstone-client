import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Expenses extends Component {
  render () {
    if (this.props.user) {
      return (
        <div className="homenav">
          <NavLink exact to='/' className="homenav-btn" activeClassName="selected">Home</NavLink>
          <NavLink exact to='/expenses' className="homenav-btn" activeClassName="selected">View Expenses</NavLink>
          <NavLink exact to='/expenses-create' className="homenav-btn" activeClassName="selected">New Expense</NavLink>
        </div>
      )
    } else {
      return (
        <div className="homenav">
          <h3>Please login to track your expenses!</h3>
        </div>
      )
    }
  }
}

export default Expenses
