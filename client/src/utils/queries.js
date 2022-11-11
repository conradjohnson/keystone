import { gql } from '@apollo/client';


export const QUERY_PROPERTY = gql`
  query getProperty($_id: ID!) {
    property(_id: $_id) {
      _id
      address
      address2
      city
      state
      country
      zip
      value
      lat
      lng
      description
      images
      forSale
      salePrice
    }
  }
`;

export const QUERY_PROPERTIES = gql`
  query getProperties {
  properties {
    _id
    address
    address2
    city
    state
    country
    zip
    value
    lat
    lng
    description
    images
    forSale
    salePrice
  }
}
`;

export const QUERY_SALE_PROPERTIES = gql`
  query getSaleProperties {
  properties(forSale: true) {
    _id
    address
    address2
    city
    state
    country
    zip
    value
    lat
    lng
    description
    images
    forSale
    salePrice
  }
}
`;


export const QUERY_USER = gql`
  query User {
  user {
    _id
    name
    email
    properties {
      _id
      address
      address2
      city
      state
      country
      zip
      value
      lat
      lng
      description
      images
      forSale
      salePrice
    }
  }
}
`;
