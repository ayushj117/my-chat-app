import React from 'react';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { client } from './Client/pages/gql';
import NoMatch from './Client/pages/NoMatch';
import Middle from './Client/pages/Middle';


const App = () => (
  <>
    <ApolloProvider client={client}>
    <Router>
        <Switch>
        <Route path="/" component={Middle} />
        <Route component={NoMatch} />
    </Switch>
      </Router>
    </ApolloProvider>
  </>
);
export default App;
