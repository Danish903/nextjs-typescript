import * as React from "react";
import { HelloWorldComponent } from "../generated/apolloComponents";
import Layout from "../components/Layout";

export const Hello = () => {
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

export default Hello;
