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
    value: Float
    description: String
    image: [String]
    forSale: Boolean
    salePrice: Float
    
  }


  type User {
    _id: ID
    firstName: String
    lastName: String
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
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addProperty(address: String, address2: String, city: String, state: String, zip: String, images: [String], lat: String, lng: String, value: Float ): Property
    updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String, property: ID): User
    updateProperty(_id: ID!, forSale: Boolean, salePrice: Float, NftUri: String, isNft: Boolean, images: [String], lat: String, lng: String, value: Float ): Property
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
