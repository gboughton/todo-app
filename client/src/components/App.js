import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import ListTasks from './ListTasks';
import AddTask from './AddTask';

//start apollo to connect react with graphql
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client = {client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">To-Do List</h1>
        </header>
        {/* calling imported react components */}
        <AddTask/>
        <ListTasks/>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
