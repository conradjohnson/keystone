const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Property {
    _id: ID
    address: String
    address2: String
    city: String
    state: String
    country: String
    zip: String
    value: Int
    lat: String
    lng: String
    description: String
    images: [String]
    forSale: Boolean
    salePrice: Int
    sqft: Int
    bedrooms: Int
    bathrooms: Int
    yearBuilt: Int
    isNft: Boolean
    nftUri: String
    nftTokenId: String
    sellerId: ID
       
  }


  type User {
    _id: ID
    name: String
    email: String
    properties: [Property]
    wallet: String
    username: String
  }


  type Auth {
    token: ID
    user: User
  }

  type Query {
    properties(forSale: Boolean): [Property]
    property(propertyId: ID!): Property
    user: User
   
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addProperty(address: String, address2: String, city: String, state: String, zip: String, images: [String], lat: String, lng: String, value: Int, description: String ): Property
    exchangeProperty(sellerId: ID!, buyerId: ID!, propId: ID!): Property
    updateUser(_id: ID!, name: String, email: String, password: String, properties: [ID], wallet: String ): User
    updateProperty(_id: ID!, forSale: Boolean, salePrice: Int, nftTokenId: String, nftUri: String, isNft: Boolean, images: [String], lat: String, lng: String, value: Int, sellerId: ID ): Property
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
