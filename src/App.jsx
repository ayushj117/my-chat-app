import React from 'react';
import { ApolloProvider } from "react-apollo";
import { client } from './gql';
import Exchange from './Exchange';

const App = () => (
  <>
    <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app</h2>
      <Exchange/>
    </div>
    </ApolloProvider>
  </>
);
export default App;
