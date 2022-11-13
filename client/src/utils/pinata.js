//const dotenv = require('dotenv');
// dotenv.config();
//const key = process.env.REACT_APP_PINATA_KEY;
//const secret = process.env.REACT_APP_PINATA_SECRET;
 const key = "49a3429d423fd4c3da4b";
 const secret = "28f8159c0cda3d7323c7a6ae5e8a70c2a3ebc8eed33f79e30bbebd20cd77143e";

const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};
