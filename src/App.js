import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ApolloHooks from './apollo-hooks/Main';
import ApolloMain from './apollo/Main';
import RelayMain from './relay/Main';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Redirect exact path="/" to="/apollo-hooks" />
        <Route path="/apollo-hooks" component={ApolloHooks} />
        <Route path="/apollo" component={ApolloMain} />
        <Route path="/relay" component={RelayMain} />
      </Switch>
    </Router>
  );
};

export default App;
