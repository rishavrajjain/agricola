import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';

function App(props) {
  return (
    <Router>
    
      <div className="container bg-gradent-primary">
        App
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/signup" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/dashboard" exact component={Dashboard}/>
        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
