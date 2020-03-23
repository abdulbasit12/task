import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Add from './components/Add';
import List from './components/List';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        < Route path="/add" component={Add} />
        <Route path="/list" component={List} />
      </div>
    </Router>
  );
}

export default App;
