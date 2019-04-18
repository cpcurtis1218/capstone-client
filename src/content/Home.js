import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap'

class Expenses extends Component {
  render () {
    if (this.props.user) {
      return (
        <div className="homenav">
          <ButtonGroup size='lg' className="m-2 justify-content-center">
            <NavLink exact to='/' className="btn homenav-btn mx-1" activeClassName="selected">Home</NavLink>
            <NavLink exact to='/expenses' className="btn homenav-btn mx-1" activeClassName="selected">View Expenses</NavLink>
            <NavLink exact to='/expenses-create' className="btn homenav-btn mx-1" activeClassName="selected">New Expense</NavLink>
          </ButtonGroup>
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
