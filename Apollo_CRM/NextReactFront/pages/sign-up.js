import { gql, useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import { NEW_USER } from '../api/mutations';

import Layout from '../components/Layout/Layout';
import handleFocus from '../utils/handleFocus';

const SignUp = () => {
  const [errorState, setErrorState] = useState(null);
  const [newUser] = useMutation(NEW_USER);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should have at least 6 characters'),
    }),
    onSubmit: async values => {
      const { name, lastName, email, password } = values;
      try {
        const {
          data: { newUser: user },
        } = await newUser({
          variables: {
            input: {
              name,
              lastName,
              email,
              password,
            },
          },
        });

        setErrorState(`Welcome, ${user.name}!`);
        setTimeout(() => {
          setErrorState(null);
          router.push('/login');
        }, 1500);
      } catch (error) {
        setErrorState(error.message.replace('Graphql error: ', ''));

        setTimeout(() => {
          setErrorState(null);
        }, 1500);
      }
    },
  });

  const { name, lastName, email, password } = formik.values;
  const { errors } = formik;

  const showError = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{errorState}</p>
      </div>
    );
  };

  return (
    <Layout>
      {errorState && showError()}
      <h1 className="text-center text-2xl text-white font-light">Sign Up</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="name"
                placeholder="Name"
                value={name}
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && errors.name && (
              <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                <p>{errors.name}</p>
              </div>
            )}
            <div className="mb-4 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="lastName"
                placeholder="last name"
                value={lastName}
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.lastName && errors.lastName && (
              <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                <p>{errors.lastName}</p>
              </div>
            )}
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
                value={email}
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
                value={password}
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
              className="bg-gray-600 w-full mt-5 p-2 text-white uppercase cursor-pointer duration-500 hover:bg-gray-900"
              value="Create Account"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
