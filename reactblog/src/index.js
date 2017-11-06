import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
//import {HashRouter, Route, hashHistory, IndexRoute} from 'react-router';




import App from './App';

const client = new ApolloClient();
 



const Root = () => {
  return (
  <ApolloProvider client={client}>
 
    <App/>
</ApolloProvider>
  );
};
ReactDOM.render(
 <Root/>,
 document.querySelector('#root')
);






//const networkInterface = createNetworkInterface({uri: 'http://localhost:4000/Post'}); , {createNetworkInterface}  {networkInterface,}