import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Expenses extends Component {
  render () {
    return (
      <div>
        <h3>Welcome Home</h3>
        <p>To view your expenses, please click <Link to='/expenses'><button>here</button></Link></p>
        <p>To add a new expense, please click <Link to='/expenses-create'><button>here</button></Link></p>
      </div>
    )
  }
}

export default Expenses
