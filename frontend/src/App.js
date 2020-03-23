import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Add from './components/Add';
import List from './components/List';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Add} />
        <Route path="/list" component={List} />
      </div>
    </Router>
  );
}

export default App;
