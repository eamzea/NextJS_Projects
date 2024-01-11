import gql from 'graphql-tag';

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
    }
  }
`;

export const GET_EXECUTIVE_CLIENTS = gql`
  query getExecutiveClients {
    getExecutiveClients {
      id
      name
      lastName
      email
      company
      phone
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id) {
      id
      name
      lastName
      company
      email
      phone
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id) {
      name
      price
      inventory
      description
    }
  }
`;

export const GET_PRODUCTS = gql`
  {
    getProducts {
      id
      name
      price
      inventory
    }
  }
`;

export const GET_EXECUTIVE_ORDERS = gql`
  {
    getExecutiveOrders {
      client {
        id
        name
        lastName
        email
        phone
      }
      id
      orders {
        id
        quantity
        name
      }
      total
      state
    }
  }
`;

export const GET_BEST_CLIENTS = gql`
  {
    getBestClients {
      client {
        name
      }
      total
    }
  }
`;

export const GET_BEST_EXECUTIVES = gql`
  {
    getBestExecutives {
      total
      executive {
        name
      }
    }
  }
`;
