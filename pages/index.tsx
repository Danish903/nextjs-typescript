import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const IndexPage: React.FunctionComponent = () => {
   return (
      <Layout title="Home | Next.js + TypeScript Example">
         <h1>Hello 👋</h1>
         <p>
            <Link href="/about">
               <a>About</a>
            </Link>
         </p>
         <Mutation
            mutation={gql`
               mutation {
                  login(
                     password: "cakelock"
                     email: "anishdhungelster@gmail.com"
                  ) {
                     id
                     name
                     firstName
                     lastName
                  }
               }
            `}
         >
            {mutate => {
               return (
                  <button
                     onClick={async () => {
                        const res = await mutate();
                        console.log(res);
                     }}
                  >
                     Login Mutation
                  </button>
               );
            }}
         </Mutation>
      </Layout>
   );
};

export default IndexPage;
