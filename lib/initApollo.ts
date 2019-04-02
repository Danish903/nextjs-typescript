import {
   ApolloClient,
   InMemoryCache,
   NormalizedCacheObject
} from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import fetch from "isomorphic-unfetch";
import { isBroswer } from "./isBroswer";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBroswer) {
   //@ts-ignore
   global.fetch = fetch;
}

interface Options {
   getToken: () => string;
}

function create(
   initialState: any,
   { getToken }: Options
): ApolloClient<NormalizedCacheObject> {
   const httpLink = createHttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include"
   });

   const authLink = setContext((_, { headers }) => {
      const token = getToken();

      return {
         headers: {
            ...headers,
            // authorization: token ? `Bearer ${token}` : ""
            cookie: token ? `qid=${token}` : ""
         }
      };
   });

   // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
   return new ApolloClient({
      connectToDevTools: isBroswer,
      ssrMode: !isBroswer, // Disables forceFetch on the server (so queries are only run once)
      link: authLink.concat(httpLink),
      cache: new InMemoryCache().restore(initialState || {})
   });
}

export default function initApollo(
   initialState: any,
   options: Options
): ApolloClient<NormalizedCacheObject> {
   // Make sure to create a new client for every server-side request so that data
   // isn't shared between connections (which would be bad)
   if (!isBroswer) {
      return create(initialState, options);
   }

   // Reuse client on the client-side
   if (!apolloClient) {
      apolloClient = create(initialState, options);
   }

   return apolloClient;
}