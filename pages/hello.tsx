import * as React from "react";
import { HelloWorldComponent } from "../generated/apolloComponents";
import Layout from "../components/Layout";
import { withAuth } from "../components/withAuth";

export const Hello: React.FC = () => {
   return (
      <Layout title="Hello">
         <HelloWorldComponent>
            {({ data }) => {
               return (
                  <div>
                     {data && data.helloWorld ? data.helloWorld : "loading ..."}
                  </div>
               );
            }}
         </HelloWorldComponent>
      </Layout>
   );
};

export default withAuth(Hello);
