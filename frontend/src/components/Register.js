// frontend/src/components/Register.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../services/api";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "buyer",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phone: Yup.string().required("Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Required"),
        role: Yup.string()
          .oneOf(["buyer", "seller"], "Invalid Role")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await register(values);
          history.push("/login");
        } catch (error) {
          console.error("Registration failed", error);
        }
        setSubmitting(false);
      }}
    >
      <Form>
        <div>
          <label>First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />
        </div>
        <div>
          <label>Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />
        </div>
        <div>
          <label>Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
        </div>
        <div>
          <label>Phone</label>
          <Field name="phone" type="text" />
          <ErrorMessage name="phone" />
        </div>
        <div>
          <label>Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
        </div>
        <div>
          <label>Role</label>
          <Field name="role" as="select">
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </Field>
          <ErrorMessage name="role" />
        </div>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default Register;
