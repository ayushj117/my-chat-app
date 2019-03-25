import React from 'react';
import { ApolloProvider } from "react-apollo";
import { client } from './Client/pages/gql';
import DialogBox from './Client/pages/DialogBox';

const App = () => (
  <>
    <ApolloProvider client={client}>
    <div>
      <h2><center>Chat App</center></h2>
      <DialogBox/>
    </div>
    </ApolloProvider>
  </>
);
export default App;
