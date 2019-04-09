import * as React from "react";
import Layout from "../components/Layout";
import { Formik, Field } from "formik";
import { InputField } from "../components/Fields/InputField";
import { RegisterComponent } from "../generated/apolloComponents";
import Router from "next/router";

const Register: React.FunctionComponent<{}> = () => (
   <Layout title="Register Page">
      <RegisterComponent>
         {register => (
            <Formik
               validateOnBlur={false}
               validateOnChange={false}
               initialValues={{
                  email: "",
                  firstName: "",
                  lastName: "",
                  password: ""
               }}
               onSubmit={async (values, { setErrors }) => {
                  const { email, firstName, lastName, password } = values;
                  try {
                     const response = await register({
                        variables: {
                           data: {
                              email,
                              firstName,
                              lastName,
                              password
                           }
                        }
                     });
                     Router.push("/check-email");
                  } catch (error) {
                     const err =
                        error.graphQLErrors[0].extensions.exception
                           .validationErrors;
                     const errors: any = {};
                     err.forEach((validationError: any) => {
                        Object.values(validationError.constraints).forEach(
                           (message: any) => {
                              errors[validationError.property] = message;
                           }
                        );
                     });

                     setErrors(errors);
                  }
               }}
            >
               {({ values, handleSubmit }) => {
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
                        <Field
                           name="firstName"
                           placeholder="First Name"
                           component={InputField}
                        />
                        <Field
                           name="lastName"
                           placeholder="Last Name"
                           component={InputField}
                        />
                        <button type="submit">Submit</button>
                     </form>
                  );
               }}
            </Formik>
         )}
      </RegisterComponent>
   </Layout>
);

export default Register;
