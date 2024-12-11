// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL,
//   credentials: 'same-origin',
// });

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

// export default client;
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
// import fetch from 'cross-fetch'; // Необходим для работы в серверной среде

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL,
  credentials: 'same-origin',
  // fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export function getClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

export default client;
