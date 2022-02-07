import React from "react";
import Router from "next/router";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import styles from "../styles/LoginForm.module.scss";

const LoginForm = (props) => {

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address.')
      .required('This field is required.'),
    password: Yup.string()
      .required('This field is required.'),
  });

  return (
    <div className="container" className={styles['login-wrapper']}>
      <h3 className="mb-5">👤 Login</h3>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          const REST_API_URL = "https://ylc-fr-case.herokuapp.com/api/auth";
          fetch(REST_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          }).then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Something went wrong');
            }
          }).then(data => {
            props.setToken(data.token);
            props.setUser(data.email);
            Router.push('/car-list');
          }).catch((error) => {
            console.log(error);
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="form-container">
            <div className="form-group mb-4">
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="form-control form-control-lg"
              />
              { touched.email
                && errors.email
                && <small className="text-danger form-text position-absolute">{errors.email}</small> }
            </div>

            <div className="form-group mb-4 pt-3">
              <Field 
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="form-control form-control-lg"
              />
              { touched.password
                && errors.password
                && <small className="text-danger form-text position-absolute">{errors.password}</small> }
            </div>

            <button type="submit" className="btn mt-4 btn-lg btn-outline-primary w-100">Login</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm;