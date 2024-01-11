import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NEW_CLIENT } from '../api/mutations';
import { GET_EXECUTIVE_CLIENTS } from '../api/queries';
import handleFocus from '../utils/handleFocus';
import Layout from '../components/Layout/Layout';
import Submit from '../components/common/Submit';

const newClient = () => {
  const [errorState, setErrorState] = useState(null);
  const [newClient] = useMutation(
    NEW_CLIENT,
    // Update Cache with new data
    {
      update(cache, { data: { newClient } }) {
        const { getExecutiveClients } = cache.readQuery({
          query: GET_EXECUTIVE_CLIENTS,
        });

        cache.writeQuery({
          query: GET_EXECUTIVE_CLIENTS,
          data: {
            getExecutiveClients: [...getExecutiveClients, NEW_CLIENT],
          },
        });
      },
    }
  );
  const nameInput = useRef(null);
  const lastNameInput = useRef(null);
  const companyInput = useRef(null);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      company: Yup.string().required('Company is required'),
      email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
    }),
    onSubmit: async values => {
      nameInput.current.disabled = true;
      lastNameInput.current.disabled = true;
      companyInput.current.disabled = true;
      emailInput.current.disabled = true;
      phoneInput.current.disabled = true;

      const { name, lastName, email, company, phone } = values;
      try {
        const { data } = await newClient({
          variables: {
            input: {
              name,
              lastName,
              email,
              company,
              phone,
            },
          },
        });
        setErrorState(`Client created`);
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

  const { errors } = formik;

  const showError = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-md text-center mx-auto rounded-sm shadow-md">
        <p className="text-xl">{errorState}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Client</h1>
      {errorState && showError()}
      <div className="flex flex-wrap justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-sm"
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
                type="text"
                placeholder="Client Name"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={nameInput}
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
                type="text"
                placeholder="Client Last Name"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={lastNameInput}
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
                htmlFor="company"
              >
                Company
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="company"
                type="text"
                placeholder="Client Company"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={companyInput}
              />
            </div>
            {formik.touched.company && errors.company && (
              <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                <p>{errors.company}</p>
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
                placeholder="Client Email"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={emailInput}
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
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="string"
                placeholder="Client Phone"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={phoneInput}
              />
            </div>
            <Submit classes='bg-gray-800 w-full mt-5 p-2 text-white uppercase cursor-pointer rounded-sm shadow-md duration-500 hover:bg-gray-900 hover:shadow-xl hover:scale-105 transform' title='Register Client'/>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default newClient;
