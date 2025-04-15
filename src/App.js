/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }
  // DEBIT IMPLEMENTATION SECTION
  // Fetch debits
  componentDidMount() {
    fetch("https://moj-api.herokuapp.com/debits")
      .then(response => response.json())
      .then(data => this.setState({ debitList: data }))
      .catch(err => console.error("Failed to fetch debits", err));
  
    fetch("https://moj-api.herokuapp.com/credits")
      .then(response => response.json())
      .then(data => this.setState({ creditList: data }))
      .catch(err => console.error("Failed to fetch credits", err));
  }

  addDebit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const amount = parseFloat(event.target.amount.value);
    const newDebit = {
      id: Math.random().toString(), // fake ID
      description: description,
      amount: amount,
      date: new Date().toISOString()
    };
  
    const updatedDebits = [...this.state.debitList, newDebit];
    const updatedBalance = this.state.accountBalance - amount;
  
    this.setState({
      debitList: updatedDebits,
      accountBalance: updatedBalance
    });
  
    event.target.reset(); // optional: clear form
  };

  addDebit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const amount = parseFloat(event.target.amount.value);
    const newDebit = {
      id: Math.random().toString(),
      description: description,
      amount: amount,
      date: new Date().toISOString()
    };
  
    const updatedDebits = [...this.state.debitList, newDebit];
    const updatedBalance = this.state.accountBalance - amount;
  
    this.setState({
      debitList: updatedDebits,
      accountBalance: updatedBalance
    });
  
    event.target.reset();
  }

  addCredit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const amount = parseFloat(event.target.amount.value);
    const newCredit = {
      id: Math.random().toString(),
      description: description,
      amount: amount,
      date: new Date().toISOString()
    };
  
    const updatedCredits = [...this.state.creditList, newCredit];
    const updatedBalance = this.state.accountBalance + amount;
  
    this.setState({
      creditList: updatedCredits,
      accountBalance: updatedBalance
    });
  
    event.target.reset();
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (
    <Credits
      credits={this.state.creditList}
      addCredit={this.addCredit}
      accountBalance={this.state.accountBalance}
    />) 
    const DebitsComponent = () => (
      <Debits 
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    );

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment_3_bank_of_react_v2">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;