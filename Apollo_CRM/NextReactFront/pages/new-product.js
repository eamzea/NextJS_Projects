import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NEW_PRODUCT } from '../api/mutations';
import { GET_PRODUCTS } from '../api/queries';
import handleFocus from '../utils/handleFocus';
import Layout from '../components/Layout/Layout';
import Submit from '../components/common/Submit';

const newProduct = () => {
  const [errorState, setErrorState] = useState(null);
  const [newProduct] = useMutation(
    NEW_PRODUCT,
    // Update Cache with new data
    {
      update(cache, { data: { newProduct } }) {
        const { getProducts } = cache.readQuery({
          query: GET_PRODUCTS,
        });

        cache.writeQuery({
          query: GET_PRODUCTS,
          data: {
            getProducts: [...getProducts, NEW_PRODUCT],
          },
        });
      },
    }
  );

  const nameInput = useRef(null);
  const priceInput = useRef(null);
  const inventoryInput = useRef(null);
  const descriptionInput = useRef(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      inventory: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      price: Yup.number()
        .required('Price is required')
        .positive('Only positive number')
        .integer('Only integer number'),
      inventory: Yup.number()
        .required('Inventory is required')
        .positive('Only positive number')
        .integer('Only integer number'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async values => {
      nameInput.current.disabled = true;
      priceInput.current.disabled = true;
      inventoryInput.current.disabled = true;
      descriptionInput.current.disabled = true;

      const { name, price, inventory, description } = values;
      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              price,
              inventory,
              description,
            },
          },
        });
        setErrorState(`Product created`);
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
      <h1 className="text-2xl text-gray-800 font-light">New Product</h1>
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
                placeholder="Product Name"
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
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Product Price"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={priceInput}
              />
            </div>
            {formik.touched.price && errors.price && (
              <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                <p>{errors.price}</p>
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
                type="number"
                placeholder="Inventory"
                readOnly
                onFocus={handleFocus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={inventoryInput}
              />
            </div>
            {formik.touched.inventory && errors.inventory && (
              <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                <p>{errors.inventory}</p>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                ref={descriptionInput}
              />
            </div>
            {formik.touched.description && errors.description && (
              <div className="my-1 bg-red-100 border-l-2 border-red-500 text-red-700 text-xs p-2">
                <p>{errors.description}</p>
              </div>
            )}
            <Submit
              classes="bg-gray-800 w-full mt-5 p-2 text-white uppercase cursor-pointer rounded-sm shadow-md duration-500 hover:bg-gray-900 hover:shadow-xl hover:scale-105 transform"
              title="Register Product"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default newProduct;
