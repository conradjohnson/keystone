const { AuthenticationError } = require('apollo-server-express');
const { User, Property, Category, PropertyTx } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    properties: async () => {
      return await Property.find();
    },

    saleproperties: async () => {
      return await Property.find({forSale:true});
    },
    
    property: async (parent, {id}, context)=>{
      return await Property.findById(id);
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('properties');

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addProperty: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        const property = new Property({
          address: args.address,
          address2: args.address2,
          city: args.city,
          state: args.state,
          zip: args.zip,
          images: args.images,
          lat: args.lat,
          lng: args.lng,
          value: args.value
        });

        await User.findByIdAndUpdate(context.user._id, { $push: { properties: property } });
        await Property.create(property);
        return property;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateProperty: async (parent, args, context) => {
      
      return await Product.findByIdAndUpdate(_id, {

        forSale: args.forSale,
        salePrice: args.salePrice,
        NftUri: args.NftUri,
        isNft: args.isNft,
        images: args.images,
        lat: args.lat,
        lng: args.lng,
        value: args.value
      }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
