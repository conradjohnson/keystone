import { gql } from '@apollo/client';


export const QUERY_PROPERTY = gql`
  query Property($propertyId: ID!) {
    property(propertyId: $propertyId) {
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
      isNft
      nftUri
      nftTokenId
      sellerId
    }
  }
`;

export const QUERY_USER_PROPERTY = gql`
query UserWithProperty($id: ID!) {
  property(_id: $id) {
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
    isNft
    nftUri
  }
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
      sqft
      bedrooms
      bathrooms
      yearBuilt
      isNft
      nftUri
    }
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
  query getSaleProperties($forSale: Boolean) {
  properties(forSale: $forSale) {
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
