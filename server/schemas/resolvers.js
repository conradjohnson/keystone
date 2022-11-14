const { AuthenticationError } = require('apollo-server-express');
const { User, Property, Category, PropertyTx } = require('../models');
const { signToken } = require('../utils/auth');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
async function getPropertyInfo(address1, address2){

  address1 = encodeURIComponent(address1);
  address2 = encodeURIComponent(address2);
  
  let propertyDetailURL = `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?`;
  propertyDetailURL += `address1=${address1}`;
  propertyDetailURL += `&address2=${address2}`;
  //propertyDetailURL+= `&apikey=8435ffe43427e5050fc351ac57362d9a`;
  console.log(propertyDetailURL);
  let propertyObj = {};

  let results = await fetch(propertyDetailURL, {
    method: "GET",
    headers: {
      "accept": "application/json;charset=UTF-8",
      "apikey": process.env.ATTOM_KEY
   }
  })
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if (result.status.msg==="SuccessWithResult") {
    propertyObj.lat = result.property[0].location.latitude;
    propertyObj.lng = result.property[0].location.longitude;
    propertyObj.value = result.property[0].assessment.market.mktTtlValue;
    propertyObj.bedrooms = result.property[0].building.rooms.beds;
    propertyObj.bathrooms = result.property[0].building.rooms.bathsFull;
    propertyObj.yearBuilt = result.property[0].summary.yearBuilt;
    propertyObj.sqft = result.property[0].building.size.bldgSize;
    

  } else{
    return false;
  }

  }
    )
  .catch(error => console.log('error', error));
  return propertyObj;
}


const resolvers = {
  Query: {
    properties: async (parent, args, context) => {
      return await Property.find(args);
    },

    
    
    property: async (parent, {propertyId}, context)=>{
      return await Property.findById(propertyId);
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
    exchangeProperty: async (parent, {sellerId, buyerId, propId}, context) => {
      
      console.log(sellerId);
      // remove from the seller's properties
      await User.findByIdAndUpdate(sellerId, { $pull: { properties:  propId } });
      // add to the buyer's properties
      await User.findByIdAndUpdate(buyerId, { $push: { properties: propId } });
      // Update the property to not for sale and zero out the sale price.
      let property = Property.findByIdAndUpdate(propId, {forSale:false, salePrice: -1}, { new: true });
      // TODO Add TX to TX Table
      
      // return the property
      return property;

      //throw new AuthenticationError('Not logged in');

    },
    addProperty: async (parent, args, context) => {
      // geoip lookup here - node-fetch
      let addressString1 = args.address;
      let addressString2 = args.city+", "+args.state;
      if (context.user) {
      let propertyObj = await getPropertyInfo(addressString1, addressString2);
      //get and store values
        if (propertyObj){
      
        
          const property = new Property({
            address: args.address,
            city: args.city,
            state: args.state,
            zip: args.zip,
            lat: propertyObj.lat,
            lng: propertyObj.lng,
            value: propertyObj.value,
            bedrooms: propertyObj.bedrooms,
            bathrooms: propertyObj.bathrooms,
            sqft: propertyObj.sqft,
            yearBuilt: propertyObj.yearBuilt

          });

          await User.findByIdAndUpdate(context.user._id, { $push: { properties: property } });
          const newProperty = await Property.create(property);
          return newProperty;
        } else {
          //can't find the property in our property search.
          return false;
        }

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
      
      return await Property.findByIdAndUpdate(args._id, {

        forSale: args.forSale,
        salePrice: args.salePrice,
        nftUri: args.nftUri,
        nftTokenId: args.nftTokenId,
        isNft: args.isNft,
        images: args.images,
        lat: args.lat,
        lng: args.lng,
        value: args.value,
        sellerId: args.sellerId
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
