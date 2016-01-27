import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import {buildClientSchema} from 'graphql/'

function graphQLFetcher(graphQLParams) {
  console.log(graphQLParams);
  var paramString = JSON.stringify(graphQLParams);
  var posSubscription = paramString.indexOf('subscriptionType { name }')

  if(posSubscription > -1){
    paramString = paramString.substr(0,posSubscription) + paramString.substr(posSubscription + 27)
  }

  graphQLParams = JSON.parse(paramString);

  return fetch('https://harish.dev.agkn.net:8443/api/v1.0/helloworld', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body:  graphQLParams.query

  })
  .then(response => response.json())
  // .then(response => {
  //   if(!response.data){
  //     console.log(response);
  //     return {data: response};
  //   }
  //   return response;
  // });
  // .then(response => {
  //   if(posSubscription > -1){
  //     let res = JSON.parse(res);
  //     res.data.__schema.subscriptionType = null;
  //     return JSON.stringify(res);
  //   }
  //   return response;
  // });
}

ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.querySelector("#app"));
