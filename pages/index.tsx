import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";

import { LoginComponent } from "../generated/apolloComponents";

// @ts-ignore
const IndexPage: React.FunctionComponent = () => {
   return (
      <Layout title="Home | Next.js + TypeScript Example">
         <h1>Hello 👋</h1>
         <p>
            <Link href="/about">
               <a>About</a>
            </Link>
         </p>
         <LoginComponent>
            {mutate => {
               return (
                  <button
                     onClick={async () => {
                        const response = await mutate({
                           variables: {
                              email: "test12344@gmail.com",
                              password: "passsdfsdfsword"
                           }
                        });

                        console.log(response);
                     }}
                  >
                     Login Mutation
                  </button>
               );
            }}
         </LoginComponent>
      </Layout>
   );
};

export default IndexPage;
