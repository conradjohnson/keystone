import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_USER,
  QUERY_PROPERTY,
  QUERY_USER_PROPERTY,
  QUERY_PROPERTIES,
} from "../utils/queries";
import {
  UPDATE_PROPERTY_SALE,
  EXCHANGE_PROPERTY,
  UPDATE_PROPERTY_NFT,
} from "../utils/mutations";
import {
  mintNFT,
  getNFT,
  listNFT,
  cancelNFTSale,
  buyNFT,
  approveNFTTransfer,
  approveERC20Transfer,
} from "../utils/interact";
import { useStoreContext } from "../utils/GlobalState";
import axios from "axios";
const alchemyKey =
  "wss://eth-goerli.g.alchemy.com/ws/N5lg6Vk0u-FVp5oaIy7S9QUhzyVZ_PzX";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const NFTContractABI = require("../utils/abi/NFTABI.json");
const NFTContractAddress = "0xD2B95c89c90A0dAE85F88470f257c1F5ea3DA643";
const ERC20ContractABI = require("../utils/abi/erc20ABI.json");
const ERC20ContractAddress = "0x6B6e63454c42B32a1975bE39a22eed8fF8c4489C";
const NFTMarketContractABI = require("../utils/abi/NFTMarketplaceABI.json");
const NFTMarketContractAddress = "0xc6343805723EEe7180430A071B3BC02Df7e74429";

function PropertyDetail() {
  const [formState, setFormState] = useState({ salePrice: "" });
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [NFT, setNFT] = useState("");
  const [isNFTApproved, setIsNFTApproved] = useState("");
  const [isERC20Approved, setIsERC20Approved] = useState("");
  const [file, setFile] = useState();
  //const [property, setProperty]=useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [updatePropertySale] = useMutation(UPDATE_PROPERTY_SALE);
  const [updatePropertyNFT] = useMutation(UPDATE_PROPERTY_NFT);
  const [exchangeProperty] = useMutation(EXCHANGE_PROPERTY);
  // get the property details from the DB!
  const { loading, error, data } = useQuery(QUERY_PROPERTY, {
    // pass URL parameter
    variables: { propertyId: id },
  });

  //NFT Minting watching
  useEffect(() => {
    async function fetchData() {
      if (typeof NFT != "number") {
        addNFTMINTSmartContractListener(NFTContractABI, NFTContractAddress);
      }
    }
    fetchData();
  }, [NFT]);

  useEffect(() => {
    async function fetchData() {
      if (!isNFTApproved) {
        addNFTApproveSmartContractListener(NFTContractABI, NFTContractAddress);
      }
    }
    fetchData();
  }, [isNFTApproved]);

  useEffect(() => {
    async function fetchData() {
      if (!isERC20Approved) {
        addERC20ApproveSmartContractListener(
          ERC20ContractABI,
          ERC20ContractAddress
        );
      }
    }
    fetchData();
  }, [isERC20Approved]);

  let property = {};
  let hasImg = false;
  let imgPath = "/img/prop/";
  let forSale = false;
  let isNft = false;
  if (data) {
    property = data.property;
    console.log("State Object:", property);
    hasImg = property.images.length;
    forSale = property.forSale;
    imgPath += property.images[0];
    isNft = property.isNft;
  } else {
    //navigate(`/404`);
  }
  console.log(property);
  const {
    loading: loading2,
    error: error2,
    data: data2,
  } = useQuery(QUERY_USER);

  let user;
  function checkProp(id, properties) {
    let obj = properties.find((o) => o._id === id);
    return obj;
  }

  let isOwner = false;

  if (Auth.loggedIn() && data2) {
    user = data2.user;
    isOwner = checkProp(id, user.properties);
  }
  console.log(forSale);

  // set to true for now until we add in bc transactions
  //  let isNft = true;

  // Property Detail States:
  // Logged In
  // (Owner) - Needs Image
  // (Owner) - Needs NFT
  // (Owner) - List For Sale
  // (Owner) - Cancel Sale
  // (Visitor) - View Propety Detail
  // (Logged In Non-Owner) - If listed - buy
  //
  // Flags:
  //  hasImg = true if property has at least 1 image
  //  isOwner = true if the logged in user is the owner of the property
  //  isNft = true if the property has an NFT created for it and ready for sale
  //  forSale = true if the property is currently listed for sale
  //
  // // all image upload functions

  // submitImg image function
  const submitImg = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("propid", id);
    const result = await axios.post("/api/image-upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImage("/img/prop/" + result.data.filename);
  };

  // submitSale function
  const submitSale = async (event) => {
    event.preventDefault();
    //check nft contract for approval.
    const NFTContract = new web3.eth.Contract(
      NFTContractABI,
      NFTContractAddress
    );
    let currentWallet = window.ethereum.selectedAddress;
    console.log(currentWallet);
    console.log(NFTContractAddress);
    const checkNFTApproval = await NFTContract.methods
      .isApprovedForAll(currentWallet, NFTMarketContractAddress)
      .call();
    if (!checkNFTApproval) {
      // send the tx to approve and start the listener
      alert("Please first approve the Marketplace Contract");
      const { status } = await approveNFTTransfer();
      setStatus(status);
    }

    const { status } = await listNFT(
      property.nftTokenId,
      parseInt(formState.salePrice)
    );
    setStatus(status);

    let propertyResults = await updatePropertySale({
      variables: {
        id: id,
        forSale: true,
        salePrice: parseInt(formState.salePrice),
        sellerId: user._id,
      },
    });

    console.log("Update Property Results:", propertyResults);
  };

  // Mint NFT from property record
  const createNFT = async (event) => {
    event.preventDefault();
    const { status } = await mintNFT(
      `http://localhost:3000/img/prop/${property.images[0]}`,
      property.address,
      property.description
    );
    setStatus(status);
    // var receipt = await getNFT(status.tx);
    setNFT("waiting to be minted");
    console.log("CreateNFT!: waiting to be minted");
  };

  function addNFTMINTSmartContractListener(ABI, contractAddy) {
    const listenContract = new web3.eth.Contract(ABI, contractAddy);
    listenContract.events.NewMint({}, async (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setNFT(data.returnValues[1]);
        let propertyResults = await updatePropertyNFT({
          variables: {
            id: id,
            nftUri: "0xD2B95c89c90A0dAE85F88470f257c1F5ea3DA643",
            nftTokenId: data.returnValues[1],
            isNft: true,
          },
        });
        console.log("NFTTokenId?:" + data.returnValues[1]);
        setStatus("🎉 Your message has been updated!");
      }
    });
  }

  function addNFTApproveSmartContractListener(ABI, contractAddy) {
    const listenContract = new web3.eth.Contract(ABI, contractAddy);
    //emit ApprovalForAll(owner, operator, approved);
    listenContract.events.ApprovalForAll({}, async (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setIsNFTApproved(data.returnValues[2]);
        setStatus("✅ You are now ready to list for sale!");
      }
    });
  }

  function addERC20ApproveSmartContractListener(ABI, contractAddy) {
    const listenContract = new web3.eth.Contract(ABI, contractAddy);
    //emit Approval(owner, spender, value)
    listenContract.events.Approval({}, async (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setIsERC20Approved(true);
        setStatus("✅ You are now ready to buy!");
      }
    });
  }

  // cancel sale.
  const cancelSale = async (event) => {
    event.preventDefault();

    const { status } = await cancelNFTSale(property.nftTokenId);
    setStatus(status);
    let propertyResults = await updatePropertySale({
      variables: {
        id: id,
        forSale: false,
        salePrice: 0,
        sellerId: null,
      },
    });
    console.log("Update Property Results:", propertyResults);
  };

  // buyProperty function
  const buyProperty = async (event) => {
    event.preventDefault();
    // set isERC20Approved if allowance and balance are good.

    const ERC20Contract = new web3.eth.Contract(
      ERC20ContractABI,
      ERC20ContractAddress
    );
    let currentWallet = window.ethereum.selectedAddress;
    console.log(currentWallet);
    console.log(ERC20ContractAddress);
    const checkERC20Allowance = await ERC20Contract.methods
      .allowance(currentWallet, NFTMarketContractAddress)
      .call();
    let currentAllowance = web3.utils.fromWei(checkERC20Allowance);
    console.log("current Allowance: " + currentAllowance);
    if (currentAllowance < property.salePrice) {
      // send the tx to approve and start the listener
      let deficit = property.salePrice - currentAllowance + 1;
      alert(
        "Please first approve the Token Allowance Transaction for an additional: $" +
          deficit
      );
      const { status } = await approveERC20Transfer(property.salePrice + 1);
      setStatus(status);
    }

    // alert(event.target.childNodes[0].value)
    let buyTokenId = document.getElementById("tokenId").value;
    const { status } = await buyNFT(buyTokenId);
    setStatus(status);

    let propertyResults = await exchangeProperty({
      variables: {
        sellerId: property.sellerId,
        buyerId: user._id,
        propId: id,
      },
    });
    console.log("Update Property Results:", propertyResults);
  };

  //state for sale form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  if (!data) {
  }
  return (
    <>
      <div className="flex my-3 px-40 items-center padding-auto rounded shadow-lg bg-purple-100 w-10/12 ml-32">
        {/* <h2>PropertyDetail: {id} </h2> */}
        
        <div
          className="max-w-sm justify-center overflow-hidden border-2 border-purple-800 my-4 bg-white"
          key={property._id}
        >
          <div className="px-6 py-4">
            <a
              className="font-bold text-xl mb-2 text-center"
              href={"/property/" + property._id}
            >
              {property.address}
              {hasImg ? (
                <img
                  className="w-full"
                  src={"/img/prop/" + property.images[0]}
                  alt="Property Picture"
                />
              ) : (
                <img
                  src="/img/defaultHome.png"
                  alt="missing property photo"
                  width="400"
                />
              )}
              <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Value: {property.value}{" "}
              </div>
              <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                Price: {property.salePrice}{" "}
              </div>
            </a>
          </div>
        </div>
        <div className="ml-6 mt-3 items-center">
          <div>
            <div className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Address:</div>
            <div className="mt-1 text-base text-purple-700 font-bold leading-tight slide-in-bottom-h1">{property.address}</div>
          </div>
          <div className="mt-1 mb-3 text-base text-purple-700 font-bold leading-tight slide-in-bottom-h1">
            {property.city}, {property.state}
          </div>
          <div className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Description:</div>
          <div className="mt-1 mb-3 text-base text-purple-700 font-bold leading-tight slide-in-bottom-h1">{property.description}</div>
          <div className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">SQFT:</div>
          <div>{property.sqft}</div>
          <div className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Bedrooms</div>
          <div className="mt-1 mb-3 text-base text-purple-700 font-bold leading-tight slide-in-bottom-h1">{property.bedrooms}</div>
          <div className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Bathrooms</div>
          <div className="mt-1 mb-3 text-base text-purple-700 font-bold leading-tight slide-in-bottom-h1">{property.bathrooms}</div>
          <div className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Value</div>
          <div className="mt-1 mb-3 text-base text-purple-700 font-bold leading-tight slide-in-bottom-h1">${property.value}</div>
          <p className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1" id="status">{status}</p>
          {/* Start */}
          {/* State: If User is Owner and Logged in*/}
          {Auth.loggedIn() && isOwner ? (
            !hasImg ? (
              <form onSubmit={submitImg}>
                {/*If the property does NOT have an image, then display img form:  */}
                <input
                  filename={file}
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  accept="image/*"
                ></input>

                <button
                  className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : !isNft ? (
              <>
                {/*If the property IS NOT an NFT.  */}
                <h4 className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Create NFT to List for Sale</h4>
                <span className="text-lg text-purple-700 font-bold leading-tight slide-in-bottom-h1">Digitize Ownership for: {property.address}?</span>
                <form onSubmit={createNFT} method="post">
                  <button
                    className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded"
                    type="submit"
                  >
                    Create NFT
                  </button>
                </form>
              </>
            ) : forSale ? (
              <>
                {/*If the property IS forSale and user is owner  */}
                <h4 className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Listed for sale @ ${property.salePrice}</h4>
                <span className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Cancel Sale of {property.address}?</span>
                <form onSubmit={cancelSale} method="post">
                  <button
                    className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded"
                    type="submit"
                  >
                    Cancel Sale
                  </button>
                </form>
              </>
            ) : isNFTApproved ? (
              <>Needs approval tx.</>
            ) : (
              <>
                {/*If the property DOES have an image and is NOT for sale  */}
                <span>List for Sale?</span>
                <form onSubmit={submitSale} method="post">
                  <input
                    placeholder="$000?"
                    name="salePrice"
                    type="number"
                    id="salePrice"
                    onChange={handleChange}
                  ></input>
                  <button
                    className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded"
                    type="submit"
                  >
                    List for sale
                  </button>
                </form>
              </>
            )
          ) : forSale && Auth.loggedIn() ? (
            <>
              {/*If the property IS forSale and user is NOT owner  */}
              <h4>Listed for sale @ ${property.salePrice}</h4>
              <span className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Buy {property.address}?</span>
              <form onSubmit={buyProperty} method="post">
                <input
                  type="hidden"
                  name="tokenId"
                  id="tokenId"
                  value={property.nftTokenId}
                />
                <button
                  className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded"
                  type="submit"
                >
                  Buy it!
                </button>
              </form>
            </>
          ) : forSale ? (
            <>
              <h4 className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Listed for ${property.salePrice}</h4>
              <span className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Login to buy</span>
            </>
          ) : (
            <span className="text-lg text-purple-800 font-bold leading-tight slide-in-bottom-h1">Not Currently Listed For Sale.</span>
          )}
        </div>
      </div>
    </>
  );
}

// for sale first go scrapbook
// : forSale ? (
//   <div>
//   <span>This property is for sale!</span>
//   <span> Price: ${property.salePrice}</span>
//   <button>Buy It!</button>
//   <form onSubmit={buyProperty} method="post">
//        <button type="submit">Buy Property</button>
//     </form>
//   </div>
// )

export default PropertyDetail;
