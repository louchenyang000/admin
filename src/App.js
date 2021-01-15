import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import Admin from './admin/admin/admin'
import Login from './admin/login/login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Admin} />
        </Switch>
      </Router>
    );
  }
}

export default App;

