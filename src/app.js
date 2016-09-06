import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import {buildClientSchema} from 'graphql/'

function graphQLFetcher(graphQLParams) {
  var paramString = JSON.stringify(graphQLParams);
  var posSubscription = paramString.indexOf('subscriptionType { name }')

  if(posSubscription > -1){
    paramString = paramString.substr(0,posSubscription) + paramString.substr(posSubscription + 27)
  }

  graphQLParams = JSON.parse(paramString);
  // https://ui-api-dev-dca.dev.agkn.net/management/api/v1.0/provisioning
  // https://harish.dev.agkn.net:8543/management/api/v1.0/provisioning
  return fetch('https://harish.dev.agkn.net:8543/management/api/v1.0/provisioning', {
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


// fetch('/graphql', {
//   method: 'post',
//   headers: { 'Content-Type': 'application/json' },
//   credentials: 'include',
//   body:  JSON.stringify({query: '{viewer{id,name}}'})

// })
// .then(response => response.json())
// .then(data=>console.log(data))
