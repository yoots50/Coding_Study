import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import client from "./client";
import { ApolloProvider } from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* client를 어플리케이션에 제공 */}
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
