import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Button } from 'react-bootstrap'

class Expenses extends Component {
  render () {
    return (
      <div className="homenav">
        <ButtonGroup size='lg' className="m-2 justify-content-center">
          <Link to='/expenses'><Button className="mx-4" variant="dark" size="lg">View Expenses</Button></Link>
          <Link to='/expenses-create'><Button className="mx-4" variant="dark" size="lg">New Expense</Button></Link>
        </ButtonGroup>
      </div>
    )
  }
}

export default Expenses
