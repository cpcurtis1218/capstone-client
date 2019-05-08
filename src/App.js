import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Home from './content/Home'
import Expenses from './content/Expenses'
import Expense from './content/Expense'
import ExpenseCreate from './content/ExpenseCreate'
import ExpenseEdit from './content/ExpenseEdit'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  // type is a boolean. If true, display success format, else display error format
  alert = (message, type) => {
    if (type) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    } else {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  render () {
    const { user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        <section className='sidebar'>
          <Route path='/' render={() => (
            <Home alert={this.alert} user={user}/>
          )} />
        </section>
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/expenses' render={() => (
            <Expenses alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/expenses/:id' render={() => (
            <Expense alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/expenses-create' render={() => (
            <ExpenseCreate alert={this.alert} user={user} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/expenses/:id/edit' render={() => (
            <ExpenseEdit alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
