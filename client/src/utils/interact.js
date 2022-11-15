import {pinJSONToIPFS} from './pinata.js'
import React from 'react';
// const dotenv = require('dotenv');
// dotenv.config();

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
//const alchemyKey = "https://eth-goerli.g.alchemy.com/v2/N5lg6Vk0u-FVp5oaIy7S9QUhzyVZ_PzX";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);


const contractABI = require('./abi/NFTABI.json')
const contractAddress = "0xD2B95c89c90A0dAE85F88470f257c1F5ea3DA643";
const marketContractAddress = "0xc6343805723EEe7180430A071B3BC02Df7e74429";
const marketContractABI = require('./abi/NFTMarketplaceABI.json');
const ERC20ContractABI = require('../utils/abi/erc20ABI.json');
const ERC20ContractAddress = "0x6B6e63454c42B32a1975bE39a22eed8fF8c4489C";


export const buyNFT = async(tokenId) => {
  window.contract = await new web3.eth.Contract(marketContractABI, marketContractAddress);
  const transactionParameters = {
    to: marketContractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.nftBuy(tokenId).encodeABI() //make call to NFT smart contract 
  };
  try {
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }
      
      )
      return {
        success: true,
        status: "✅ NFT Sale is Complete!"
    }
} catch (error) {
    return {
        success: false,
        status: "😥 Something went wrong: " + error.message
    }
}
}

export const approveERC20Transfer= async (allowance)=>{

  //let adjAllowance = web3.utils.toWei(String(allowance));
  window.contract = await new web3.eth.Contract(ERC20ContractABI, ERC20ContractAddress);
  const transactionParameters = {
    to: ERC20ContractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.approve(marketContractAddress, web3.utils.toWei(String(allowance)) ).encodeABI() //make call to NFT smart contract 
  };
  try {
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }
      
      )
      return {
        success: true,
        status: "⏰ USD Token Allowance is getting Permissioned..."
    }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }
}


export const approveNFTTransfer = async ()=>{
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.setApprovalForAll(marketContractAddress, true ).encodeABI() //make call to NFT smart contract 
  };
  try {
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }
      
      )
      return {
        success: true,
        status: "⏰ NFT Marketplace is getting Permissioned..."
    }
} catch (error) {
    return {
        success: false,
        status: "😥 Something went wrong: " + error.message
    }
}

}


export const cancelNFTSale = async(tokenId) => {
  window.contract = await new web3.eth.Contract(marketContractABI, marketContractAddress);
  const transactionParameters = {
    to: marketContractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.nftSale(tokenId, 0, false ).encodeABI() //make call to NFT smart contract 
  };
  try {
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }
      
      )
      return {
        success: true,
        status: "✅ NFT Sale is Canceled!"
    }
} catch (error) {
    return {
        success: false,
        status: "😥 Something went wrong: " + error.message
    }
}
}


export const listNFT = async(tokenId, price)=>{

  let adjPrice = web3.utils.toWei(String(price));
  //const newPrice = toBaseUnit(toString(price), 18, web3.utils.BN)
  //adjPrice += "000000000000000000"
  window.contract = await new web3.eth.Contract(marketContractABI, marketContractAddress);
  const transactionParameters = {
    to: marketContractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.nftSale(tokenId, adjPrice, true ).encodeABI() //make call to NFT smart contract 
  };

  try {
      const txHash = await window.ethereum
          .request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          }
        
        )
        return {
          success: true,
          status: "✅ NFT is Listed for Sale!"
      }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }

}

export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) { 
    return {
    success: false,
    status: "❗Please make sure all fields are completed before minting.",
    }
  }
  //make metadata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url;
  metadata.description = description;

  //make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
      return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
      }
  } 
  //get our pinata link to our json object
  const tokenURI = pinataResponse.pinataUrl;
  console.log("Pinata link:");
  console.log(tokenURI);
  // load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    'data': window.contract.methods.Mint(tokenURI).encodeABI() //make call to NFT smart contract 
  };

  //sign transaction via Metamask
  try {
    const txHash = await window.ethereum
        .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        }
        // , function(err, txHash){
        //   if (!err)
        //    console.log('indise the function!: '+txHash);
        //    const receipt = web3.eth.getTransactionReceipt(txHash);
        //    let obj = {
        //      txHash: txHash,
        //      receipt: receipt,
        //      success: true,
        //      status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
        //    }
        //    return obj
        // }
        )
        
     
        return {
          success: true,
          status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
      }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }



}

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
