import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { AUTHENTICATE } from '../api/mutations';

import Layout from '../components/Layout/Layout';
import handleFocus from '../utils/handleFocus';

const Login = () => {
  const [errorState, setErrorState] = useState(null);
  const [authenticate] = useMutation(AUTHENTICATE);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should have at least 6 characters'),
    }),
    onSubmit: async values => {
      const { email, password } = values;
      try {
        const {
          data: {
            authenticate: { token },
          },
        } = await authenticate({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        setErrorState(`Welcome !`);

        setTimeout(() => localStorage.setItem('token', token), 1000);

        setTimeout(() => {
          setErrorState(null);
          router.push('/');
        }, 1500);
      } catch (error) {
        setErrorState(error.message.replace('Graphql error: ', ''));

        setTimeout(() => {
          setErrorState(null);
        }, 1500);
      }
    },
  });

  const { email, password } = formik.values;
  const { errors } = formik;

  const showError = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto shadow-md rounded-sm">
        <p className="text-xl">{errorState}</p>
      </div>
    );
  };

  return (
    <Layout>
      {errorState && showError()}
      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && errors.email && (
              <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                <p>{errors.email}</p>
              </div>
            )}
            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="*********"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && errors.password && (
              <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                <p>{errors.password}</p>
              </div>
            )}
            <input
              type="submit"
              className="bg-gray-600 rounded-sm w-full mt-5 p-2 text-white uppercase cursor-pointer duration-500 hover:bg-gray-900"
              value="Login"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
