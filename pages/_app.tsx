import type { AppProps } from "next/app";
import "../styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
