import React from "react";
import { MyContext } from "../interfaces/MyContext";
import { MeQuery } from "../generated/apolloComponents";
import { ME_QUERY } from "../graphql/user/queries/me";
import redirect from "../lib/redirect";

export const withAuth = <T extends object>(
   C: React.ComponentClass<T> | React.FunctionComponent<{}>
) => {
   return class AuthComponent extends React.Component<T> {
      static async getInitialProps({ apolloClient, ...ctx }: MyContext) {
         const response = await apolloClient.query<MeQuery>({
            query: ME_QUERY
         });

         if (!response || !response.data || !response.data.me) {
            redirect(ctx, "/login");
            return {
               me: null
            };
         }
         return {
            me: response.data.me
         };
      }

      render() {
         return <C {...this.props} />;
      }
   };
};
