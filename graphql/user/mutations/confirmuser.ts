import { gql } from "apollo-boost";

export const CONFIRM_USER_MUTATION = gql`
   mutation ConfirmUser($token: String!) {
      confirmUser(token: $token)
   }
`;
