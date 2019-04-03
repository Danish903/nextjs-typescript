import * as React from "react";
import Layout from "../components/Layout";
import { Formik, Field } from "formik";
import { InputField } from "../components/Fields/InputField";
import { RegisterComponent } from "../generated/apolloComponents";

const Register: React.FunctionComponent = () => (
   <Layout title="Register Page">
      <RegisterComponent>
         {register => (
            <Formik
               initialValues={{
                  email: "",
                  firstName: "",
                  lastName: "",
                  password: ""
               }}
               onSubmit={async (values, actions) => {
                  console.log({ values, actions });
                  const { email, firstName, lastName, password } = values;
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
                  console.log(response);
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
