import React from 'react';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { client } from './Client/pages/gql';
import DialogBox from './Client/pages/DialogBox';
import NoMatch from './Client/pages/NoMatch';
import Middle from './Client/pages/Middle';


const App = () => (
  <>
    <ApolloProvider client={client}>
    <Router>
        <Switch>
        {/* <Route exact path="/" component={DialogBox} /> */}
        <Route exact path="/" component={Middle} />
        <Route component={NoMatch} />
    </Switch>
      </Router>
    </ApolloProvider>
  </>
);
export default App;
