import React from "react";
import ReactDOM from "react-dom";
import ApolloProvider from './ApolloProvider.js'
import App from "./app";

const rootElement = document.getElementById("root");
ReactDOM.render(ApolloProvider, rootElement);

