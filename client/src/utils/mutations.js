import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_PROPERTY_SALE = gql`
  mutation UPDATE_PROPERTY_SALE($id: ID!, $salePrice: Int, $forSale: Boolean, $sellerId: ID) {
    updateProperty(_id: $id, salePrice: $salePrice, forSale: $forSale, sellerId: $sellerId) {
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
      sqft
      bedrooms
      bathrooms
      yearBuilt
      ifNft
      NftUri
      sellerId
    }
  }
`;

export const EXCHANGE_PROPERTY = gql`
mutation ExchangeProperty($sellerId: ID!, $buyerId: ID!, $propId: ID!) {
  exchangeProperty(sellerId: $sellerId, buyerId: $buyerId, propId: $propId) {
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
    sqft
    bedrooms
    bathrooms
    yearBuilt
    ifNft
    NftUri
  }
}
`;


export const ADD_PROPERTY = gql`
  mutation addProperty($address: String, $city: String, $state: String, $zip: String) {
    addProperty(address: $address, city: $city, state: $state, zip: $zip) {
      _id
      address
      address2
      city
      state
      country
      zip
      value
      description
      images
      forSale
      salePrice
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        properties {
          _id
          address
        }
      }
    }
  }
`;
