import * as React from "react";
import Layout from "../components/Layout";
import { Formik, Field } from "formik";
import { InputField } from "../components/Fields/InputField";
import { LoginComponent } from "../generated/apolloComponents";
import Router from "next/router";

// @ts-ignore
const LoginPage: React.FunctionComponent<Props> = () => (
   <Layout title="Register Page">
      <LoginComponent>
         {login => (
            <Formik
               validateOnBlur={false}
               validateOnChange={false}
               initialValues={{
                  email: "",
                  password: ""
               }}
               onSubmit={async (values, { setErrors }) => {
                  const errors: { [key: string]: string } = {};
                  const { email, password } = values;

                  const response = await login({
                     variables: {
                        email,
                        password
                     }
                  });
                  console.log(response);
                  if (response && response.data && !response.data.login) {
                     setErrors({
                        email: "invalid login"
                     });
                     return;
                  }
                  Router.push("/");
               }}
            >
               {({ handleSubmit }) => {
                  return (
                     <form onSubmit={handleSubmit}>
                        <Field
                           name="email"
                           placeholder="Email"
                           component={InputField}
                        />
                        <Field
                           name="password"
                           placeholder="*******"
                           component={InputField}
                           type="password"
                        />
                        <button type="submit">Submit</button>
                     </form>
                  );
               }}
            </Formik>
         )}
      </LoginComponent>
   </Layout>
);

export default LoginPage;
