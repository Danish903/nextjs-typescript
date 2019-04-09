import { MyContext } from "../interfaces/MyContext";
import { LOGOUT_MUTATION } from "../graphql/user/mutations/logout";

import redirect from "../lib/redirect";

const LogoutPage = () => {
   return null;
};

LogoutPage.getInitialProps = async ({ apolloClient, ...ctx }: MyContext) => {
   await apolloClient.mutate({ mutation: LOGOUT_MUTATION });
   await apolloClient.resetStore();
   redirect(ctx, "/");
   return {};
};

export default LogoutPage;
