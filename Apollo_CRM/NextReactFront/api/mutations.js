import gql from 'graphql-tag';

export const AUTHENTICATE = gql`
  mutation authenticate($input: AuthenticateInput) {
    authenticate(input: $input) {
      token
    }
  }
`;

export const NEW_USER = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      name
      lastName
      id
    }
  }
`;

export const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput!) {
    newClient(input: $input) {
      id
      name
      lastName
      company
      email
      phone
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput!) {
    updateClient(id: $id, input: $input) {
      name
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      name
    }
  }
`;

export const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      price
      inventory
      description
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      id
      name
      inventory
      price
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      name
    }
  }
`;

export const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput!) {
    newOrder(input: $input) {
      id
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $input: OrderInput!) {
    updateOrder(id: $id, input: $input) {
      state
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;
