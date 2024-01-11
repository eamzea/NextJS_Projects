import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { GET_CLIENT, GET_EXECUTIVE_CLIENTS } from '../../api/queries';
import Layout from '../../components/Layout/Layout';
import Loading from '../../components/common/Loading';
import handleFocus from '../../utils/handleFocus';
import Submit from '../../components/common/Submit';
import { UPDATE_CLIENT } from '../../api/mutations';

const editClient = () => {
  const [errorState, setErrorState] = useState(null);
  const router = useRouter();

  const nameInput = useRef(null);
  const lastNameInput = useRef(null);
  const companyInput = useRef(null);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);

  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id,
    },
  });
  const [updateClient] = useMutation(UPDATE_CLIENT, {
    update(cache, { data: { updateClient } }) {
      const { getExecutiveClients } = cache.readQuery({
        query: GET_EXECUTIVE_CLIENTS,
      });

      cache.writeQuery({
        query: GET_EXECUTIVE_CLIENTS,
        data: {
          getExecutiveClients: [...getExecutiveClients, UPDATE_CLIENT],
        },
      });
    },
  });

  if (loading) {
    return <Loading />;
  }

  const { getClient } = data;
  const { name, lastName, company, email, phone } = getClient;

  const schemaValidation = Yup.object({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    company: Yup.string().required('Company is required'),
    email: Yup.string().email('Email not valid').required('Email is required'),
  });

  const handleEdit = async (values, fns) => {
    nameInput.current.disabled = true;
    lastNameInput.current.disabled = true;
    companyInput.current.disabled = true;
    emailInput.current.disabled = true;
    phoneInput.current.disabled = true;

    const { name, lastName, email, company, phone } = values;
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            name,
            lastName,
            email,
            company,
            phone,
          },
        },
      });

      setErrorState(`Client edited`);

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
  };

  const showError = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-md text-center mx-auto rounded-sm shadow-md">
        <p className="text-xl">{errorState}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>
      {errorState && showError()}
      <div className="flex flex-wrap justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={{ name, lastName, company, email, phone }}
            onSubmit={handleEdit}
          >
            {props => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 rounded-sm"
                  onSubmit={props.handleSubmit}
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      ref={nameInput}
                      value={props.values.name}
                    />
                  </div>
                  {props.touched.name && props.errors.name && (
                    <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                      <p>{props.errors.name}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      ref={lastNameInput}
                      value={props.values.lastName}
                    />
                  </div>
                  {props.touched.lastName && props.errors.lastName && (
                    <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                      <p>{props.errors.lastName}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      ref={companyInput}
                      value={props.values.company}
                    />
                  </div>
                  {props.touched.company && props.errors.company && (
                    <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                      <p>{props.errors.company}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      ref={emailInput}
                      value={props.values.email}
                    />
                  </div>
                  {props.touched.email && props.errors.email && (
                    <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                      <p>{props.errors.email}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      ref={phoneInput}
                      value={props.values.phone}
                    />
                  </div>
                  <Submit
                    classes="bg-gray-800 w-full mt-5 p-2 text-white uppercase cursor-pointer rounded-sm shadow-md duration-500 hover:bg-gray-900 hover:shadow-xl hover:scale-105 transform"
                    title="Edit Client"
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default editClient;
