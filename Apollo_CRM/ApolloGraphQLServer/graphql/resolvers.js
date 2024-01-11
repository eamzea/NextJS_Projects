const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { createToken, validateToken } = require('../token/actions');
const ProductModel = require('../models/ProductModel');
const ClientModel = require('../models/ClientModel');
const OrderModel = require('../models/OrderModel');

const resolvers = {
  Mutation: {
    newUser: async (_, { input }) => {
      const { email, password } = input;

      const exist = await UserModel.findOne({ email });

      if (exist) {
        throw new Error('There is already a User with this email');
      }

      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(password, salt);

      try {
        const user = new UserModel(input);
        await user.save();

        return user;
      } catch (error) {
        console.log(error);
      }
    },
    authenticate: async (_, { input }) => {
      const { email, password } = input;

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error('There is not a User with this email');
      }

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        throw new Error('Incorrect Password');
      }

      return {
        token: createToken(user, process.env.SECRET_WORD, '24h'),
      };
    },
    newProduct: async (_, { input }) => {
      try {
        const product = new ProductModel(input);
        const newProduct = await product.save();

        return newProduct;
      } catch (error) {
        console.log(error);
      }
    },
    updateProduct: async (_, { id, input }) => {
      try {
        let product = await ProductModel.findById(id);
        console.log(product);

        if (!product) {
          throw new Error('There is not a Product with this ID');
        }

        product = await ProductModel.findByIdAndUpdate(id, input, {
          new: true,
        });

        return product;
      } catch (err) {
        console.log(err);
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        let product = await ProductModel.findById(id);
        console.log(product);

        if (!product) {
          throw new Error('There is not a Product with this ID');
        }

        product = await ProductModel.findByIdAndDelete(id);

        return product;
      } catch (error) {
        console.log(error);
      }
    },
    newClient: async (_, { input }, ctx) => {
      const { email } = input;
      try {
        let exist = await ClientModel.findOne({ email });

        if (exist) {
          throw new Error('There is already a Client registered');
        }
        let newClient = await ClientModel(input);

        newClient.executive = ctx.user.id;

        await newClient.save();

        return newClient;
      } catch (error) {
        console.log(error);
      }
    },
    updateClient: async (_, { id, input }, ctx) => {
      const { user } = ctx;

      try {
        let client = await ClientModel.findById(id);

        if (!client) {
          throw new Error('There is not a Client registered');
        }

        if (client.executive.toString() !== user.id) {
          throw new Error('This Client does not belongs to this user');
        }

        let updatedClient = await ClientModel.findByIdAndUpdate(id, input, {
          new: true,
        });

        return updatedClient;
      } catch (error) {
        console.log(error);
      }
    },
    deleteClient: async (_, { id }, ctx) => {
      const { user } = ctx;

      try {
        let client = await ClientModel.findById(id);

        if (!client) {
          throw new Error('There is not a Client registered');
        }

        if (client.executive.toString() !== user.id) {
          throw new Error('This Client does not belongs to this user');
        }

        client = await ClientModel.findByIdAndDelete(id);

        return client;
      } catch (error) {
        console.log(error);
      }
    },
    newOrder: async (_, { input }, ctx) => {
      const { user } = ctx;
      const { client } = input;

      try {
        let existClient = await ClientModel.findById(client);

        if (!existClient) {
          throw new Error('There is not a Client registered');
        }

        if (existClient.executive.toString() !== user.id) {
          throw new Error('This Client does not belongs to this user');
        }

        // Check stock

        for await (const product of input.orders) {
          const { id } = product;

          const prod = await ProductModel.findById(id);

          if (product.quantity > prod.inventory) {
            throw new Error(
              `The product: ${prod.name} exceeds the available quantity`
            );
          } else {
            prod.inventory = prod.inventory - product.quantity;
            await prod.save();
          }
        }

        const order = await OrderModel(input);

        order.executive = user.id;

        await order.save();

        return order;
      } catch (error) {
        console.log(error);
      }
    },
    updateOrder: async (_, { id, input }, ctx) => {
      const { user } = ctx;

      try {
        const order = await OrderModel.findById(id);
        const client = await ClientModel.findById(order.client);

        if (!order) {
          throw new Error('There is not a Order with this ID');
        }

        if (order.executive.toString() !== user.id) {
          throw new Error('You are not authorized to see this information');
        }

        if (!client) {
          throw new Error('There is not a Client with this ID');
        }

        if (client.executive.toString() !== user.id) {
          throw new Error('You are not authorized to see this information');
        }

        for await (const product of order.orders) {
          const { id } = product;

          const prod = await ProductModel.findById(id);

          if (product.quantity > prod.inventory) {
            throw new Error(
              `The product: ${prod.name} exceeds the available quantity`
            );
          } else {
            if (input.state === 'CANCELED') {
              prod.inventory = prod.inventory + product.quantity;
            }
            if (input.state === 'PENDING') {
              prod.inventory = prod.inventory - product.quantity;
            }
            await prod.save();
          }
        }

        const orderUpdated = await OrderModel.findByIdAndUpdate(id, input, {
          new: true,
        });

        return orderUpdated;
      } catch (error) {
        console.log(error);
      }
    },
    deleteOrder: async (_, { id }, ctx) => {
      const { user } = ctx;
      try {
        const order = await OrderModel.findById(id);

        if (!order) {
          throw new Error('There is not a Order with this ID');
        }

        if (order.executive.toString() !== user.id) {
          throw new Error('You are not authorized to see this information');
        }

        const removedOrder = await OrderModel.findByIdAndDelete(id);

        return removedOrder;
      } catch (error) {
        console.log(error);
      }
    },
  },
  Query: {
    getUser: async (_, {}, ctx) => ctx.user,
    getProducts: async () => {
      try {
        const products = await ProductModel.find({});

        return products;
      } catch (error) {
        console.log(error);
      }
    },
    getProduct: async (_, { id }) => {
      try {
        const product = await ProductModel.findById(id);
        console.log(product);

        if (!product) {
          throw new Error('There is not a Product with this ID');
        }

        return product;
      } catch (error) {
        console.log(error);
      }
    },
    getClients: async () => {
      try {
        const clients = await ClientModel.find();

        return clients;
      } catch (error) {
        console.log(error);
      }
    },
    getClient: async (_, { id }, ctx) => {
      const { user } = ctx;

      try {
        const client = await ClientModel.findById(id);

        if (!client) {
          throw new Error('There is not a Client with this ID');
        }

        if (client.executive != user.id) {
          throw new Error('You are not authorized to see this information');
        }

        return client;
      } catch (error) {
        console.log(error);
      }
    },
    getExecutiveClients: async (_, {}, ctx) => {
      const { id } = ctx.user;
      try {
        const clients = await ClientModel.find({ executive: id });

        return clients;
      } catch (error) {
        console.log(error);
      }
    },
    getOrders: async () => {
      try {
        const orders = await OrderModel.find();

        return orders;
      } catch (error) {
        console.log(error);
      }
    },
    getExecutiveOrders: async (_, {}, ctx) => {
      const { user } = ctx;
      try {
        const orders = await OrderModel.find({ executive: user.id }).populate(
          'client'
        );

        return orders;
      } catch (error) {
        console.log(error);
      }
    },
    getOrder: async (_, { id }, ctx) => {
      const { user } = ctx;
      try {
        const order = await OrderModel.findById(id);

        if (!order) {
          throw new Error('There is not a Order with this ID');
        }

        if (order.executive.toString() !== user.id) {
          throw new Error('You are not authorized to see this information');
        }

        return order;
      } catch (error) {
        console.log(error);
      }
    },
    getOrderByState: async (_, { state }, ctx) => {
      const { user } = ctx;
      try {
        const order = await OrderModel.find({ state, executive: user.id });

        if (!order) {
          throw new Error('There is not a Order with this ID');
        }

        return order;
      } catch (error) {
        console.log(error);
      }
    },
    getBestClients: async () => {
      try {
        const clients = await OrderModel.aggregate([
          {
            $match: { state: 'COMPLETED' },
          },
          {
            $group: {
              _id: '$client',
              total: { $sum: '$total' },
            },
          },
          {
            $lookup: {
              from: 'clients',
              localField: '_id',
              foreignField: '_id',
              as: 'client',
            },
          },
          {
            $sort: { total: -1 },
          },
        ]);

        return clients;
      } catch (error) {
        console.log(error);
      }
    },
    getBestExecutives: async () => {
      try {
        const executives = await OrderModel.aggregate([
          {
            $match: { state: 'COMPLETED' },
          },
          {
            $group: {
              _id: '$executive',
              total: { $sum: '$total' },
            },
          },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: '_id',
              as: 'executive',
            },
          },
          {
            $limit: 3,
          },
          {
            $sort: { total: -1 },
          },
        ]);

        return executives;
      } catch (error) {
        console.log(error);
      }
    },
    getProductByName: async (_, { text }) => {
      try {
        const products = await ProductModel.find({ $text: { $search: text } });

        return products;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
