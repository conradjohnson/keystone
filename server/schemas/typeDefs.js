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
    ifNft: Boolean
    NftUri: String
    
    
  }


  type User {
    _id: ID
    name: String
    email: String
    properties: [Property]
  }


  type Auth {
    token: ID
    user: User
  }

  type Query {
    properties: [Property]
    saleproperties: [Property]
    property(_id: ID!): Property
    user: User
   
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    addProperty(address: String, address2: String, city: String, state: String, zip: String, images: [String], lat: String, lng: String, value: Int ): Property
    updateUser(_id: ID!, name: String, email: String, password: String, property: ID): User
    updateProperty(_id: ID!, forSale: Boolean, salePrice: Int, NftUri: String, isNft: Boolean, images: [String], lat: String, lng: String, value: Int ): Property
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
