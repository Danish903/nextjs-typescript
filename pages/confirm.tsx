import * as React from "react";

import { MyContext } from "../interfaces/MyContext";
import {
   ConfirmUserMutation,
   ConfirmUserMutationVariables
} from "../generated/apolloComponents";
import { CONFIRM_USER_MUTATION } from "../graphql/user/mutations/confirmuser";
import redirect from "../lib/redirect";

export default class Confirm extends React.PureComponent {
   static async getInitialProps({
      query: { token },
      apolloClient,
      ...ctx
   }: MyContext) {
      if (!token) {
         return {};
      }
      await apolloClient.mutate<
         ConfirmUserMutation,
         ConfirmUserMutationVariables
      >({
         mutation: CONFIRM_USER_MUTATION,
         variables: { token: token as string }
      });

      redirect(ctx, "/login");

      return {};
   }

   render() {
      return "something went wrong";
   }
}
