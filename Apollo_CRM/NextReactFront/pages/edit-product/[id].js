import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
  GET_PRODUCT,
  GET_EXECUTIVE_CLIENTS,
  GET_PRODUCTS,
} from '../../api/queries';
import Layout from '../../components/Layout/Layout';
import Loading from '../../components/common/Loading';
import handleFocus from '../../utils/handleFocus';
import Submit from '../../components/common/Submit';
import { UPDATE_CLIENT, UPDATE_PRODUCT } from '../../api/mutations';

const editProduct = () => {
  const [errorState, setErrorState] = useState(null);
  const router = useRouter();

  const nameInput = useRef(null);
  const priceInput = useRef(null);
  const inventoryInput = useRef(null);
  const descriptionInput = useRef(null);

  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    update(cache, { data: { updateProduct } }) {
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, UPDATE_PRODUCT],
        },
      });
    },
  });

  if (loading) {
    return <Loading />;
  }

  const { getProduct } = data;
  const { name, price, inventory, description } = getProduct;

  const schemaValidation = Yup.object({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required'),
    inventory: Yup.string().required('Inventory is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleEdit = async (values, fns) => {
    nameInput.current.disabled = true;
    priceInput.current.disabled = true;
    inventoryInput.current.disabled = true;
    descriptionInput.current.disabled = true;

    const { name, price, inventory, description } = values;
    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            price,
            inventory: inventory * 1,
            description,
          },
        },
      });

      setErrorState(`Product edited`);

      setTimeout(() => {
        setErrorState(null);
        router.push('/products');
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
      <h1 className="text-2xl text-gray-800 font-light">Edit Product</h1>
      {errorState && showError()}
      <div className="flex flex-wrap justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={{ name, price, inventory, description }}
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
                      placeholder="Product Name"
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
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="price"
                      type="text"
                      placeholder="Product Price"
                      readOnly
                      onFocus={handleFocus}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      ref={priceInput}
                      value={props.values.price}
                    />
                  </div>
                  {props.touched.price && props.errors.price && (
                    <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                      <p>{props.errors.price}</p>
                    </div>
                  )}
                  <div className="mb-4 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="inventory"
                    >
                      Inventory
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="inventory"
                      type="text"
                      placeholder="Product Inventory"
                      readOnly
                      onFocus={handleFocus}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      ref={inventoryInput}
                      value={props.values.inventory}
                    />
                  </div>
                  {props.touched.inventory && props.errors.inventory && (
                    <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                      <p>{props.errors.inventory}</p>
                    </div>
                  )}
                  <div className="mb-4 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                      type="text"
                      placeholder="Product Description"
                      readOnly
                      onFocus={handleFocus}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      ref={descriptionInput}
                      value={props.values.description}
                    />
                  </div>
                  {props.touched.description && props.errors.description && (
                    <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                      <p>{props.errors.description}</p>
                    </div>
                  )}
                  <Submit
                    classes="bg-gray-800 w-full mt-5 p-2 text-white uppercase cursor-pointer rounded-sm shadow-md duration-500 hover:bg-gray-900 hover:shadow-xl hover:scale-105 transform"
                    title="Edit Product"
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

export default editProduct;
