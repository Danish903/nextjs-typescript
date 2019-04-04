import { NextContext } from "next";
import { NormalizedCacheObject, ApolloClient } from "apollo-boost";

export interface MyContext extends NextContext {
   apolloClient: ApolloClient<NormalizedCacheObject>;
}
