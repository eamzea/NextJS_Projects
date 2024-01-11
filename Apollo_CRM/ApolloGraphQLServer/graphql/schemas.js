const { gql } = require('apollo-server');

const typeDef = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    createdAt: String
  }

  type TopExecutive {
    total: Float
    executive: [User]
  }

  input UserInput {
    name: String
    lastName: String
    email: String
    password: String
  }

  type Token {
    token: String
  }

  input AuthenticateInput {
    email: String!
    password: String!
  }

  type Product {
    id: ID
    name: String
    inventory: Int
    description: String
    price: Float
    createdAt: String
  }

  input ProductInput {
    name: String!
    description: String!
    inventory: Int!
    price: Float!
  }

  type Client {
    id: ID
    name: String
    lastName: String
    email: String
    company: String
    phone: String
    ref: ID
  }

  type TopClient {
    total: Float
    client: [Client]
  }

  input ClientInput {
    name: String!
    lastName: String!
    email: String!
    company: String!
    phone: String
  }

  type Order {
    id: ID
    orders: [OrdersGroup]
    total: Float
    client: Client
    executive: ID
    date: String
    state: OrderState
  }

  type OrdersGroup {
    id: ID
    quantity: Int
    name: String
  }

  input OrderProductInput {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  input OrderInput {
    orders: [OrderProductInput]
    total: Float
    client: ID
    state: OrderState
  }

  enum OrderState {
    PENDING
    COMPLETED
    CANCELED
  }

  type Query {
    getUser: User
    getProducts: [Product]
    getProduct(id: ID!): Product
    getClients: [Client]
    getClient(id: ID!): Client
    getExecutiveClients: [Client]
    getOrders: [Order]
    getExecutiveOrders: [Order]
    getOrder(id: ID!): Order
    getOrderByState(state: String!): [Order]

    #Advanced Queries
    getBestClients: [TopClient]
    getBestExecutives: [TopExecutive]
    getProductByName(text: String!): [Product]
  }

  type Mutation {
    #Users
    newUser(input: UserInput): User
    authenticate(input: AuthenticateInput): Token

    #Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): Product

    #Clients
    newClient(input: ClientInput!): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): Client

    #Orders
    newOrder(input: OrderInput!): Order
    updateOrder(id: ID!, input: OrderInput!): Order
    deleteOrder(id: ID!): Order
  }
`;

module.exports = typeDef;
