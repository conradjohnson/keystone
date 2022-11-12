import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_PROPERTY, QUERY_USER_PROPERTY, QUERY_PROPERTIES } from '../utils/queries';
import { UPDATE_PROPERTY_SALE, EXCHANGE_PROPERTY } from '../utils/mutations';
import { useStoreContext } from '../utils/GlobalState';
import axios from 'axios';


function PropertyDetail(){
    const [formState, setFormState] = useState({ salePrice: ''});
    const [image, setImage] = useState(null);
    const [file, setFile] = useState();
    //const [property, setProperty]=useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    const [updatePropertySale] = useMutation(UPDATE_PROPERTY_SALE);
    const [exchangeProperty] = useMutation(EXCHANGE_PROPERTY);
     // get the property details from the DB!
    const { loading, error, data } = useQuery( QUERY_PROPERTY, {
      // pass URL parameter
      variables: { propertyId: id },
    });
   
    let property = {};
    let hasImg = false;
    let imgPath = "/img/prop/";
    let forSale = false;
    if (data){
      property = data.property;
      console.log("State Object:", property)
      hasImg = property.images.length;
      forSale = property.forSale;
      imgPath += property.images[0];
    } else {
      //navigate(`/404`);
    }
    console.log(property);
    const { loading:loading2, error:error2, data:data2 } = useQuery( QUERY_USER);

    let user;
    function checkProp(id, properties){
      let obj = properties.find(o => o._id === id);
      return obj;
    }
    
    let isOwner = false;

    if (Auth.loggedIn() && data2){
      user = data2.user;
      isOwner = checkProp(id, user.properties);
    }
    console.log(forSale);
       
    
    // set to true for now until we add in bc transactions 
    let isNft = true;

      
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
    const submitImg = async event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("image", file)
        formData.append("propid", id)
        const result = await axios.post('/api/image-upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        setImage('/img/prop/'+result.data.filename)
      }
    
    // submitSale function
    const submitSale = async event => {
      event.preventDefault()

      let propertyResults = await updatePropertySale( {
        variables: {
          "id": id,
          "forSale": true,
          "salePrice": parseInt(formState.salePrice),
          "sellerId": user._id
         
        }});
    
     console.log("Update Property Results:", propertyResults) 
    

    }

    const cancelSale = async event => {
      event.preventDefault()
      let propertyResults = await updatePropertySale( {
        variables: {
          "id": id,
          "forSale": false,
          "salePrice": 0,
          "sellerId": null
          
         
        }});
        console.log("Update Property Results:", propertyResults) 


      }
  

    // buyProperty function
    const buyProperty = async event => {
      event.preventDefault()

      let propertyResults = await exchangeProperty( {
        variables: {
          "sellerId": property.sellerId,
          "buyerId": user._id,
          "propId": id,
         
        }});
        console.log("Update Property Results:", propertyResults)
      // const { loading, error, data } = useQuery( QUERY_PROPERTY, {
      //   // pass URL parameter
      //   variables: { propertyId: id },
      // });
    }

      //state for sale form
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      if (!data){
        
      }
    return (
        
        <>
          <div className="container my-1">
            <h2>PropertyDetail: {id} </h2>
            <div>
              <h2>{property.address}</h2>
            </div>
            {hasImg ? (
               <img src={imgPath} width="400"/>
            ):(
              <img src="/img/defaultHome.png" alt="missing property photo" width="400" />
            ) }
            <dl>
              <dt>Address:</dt>
              <dd>{property.address}</dd>
              <dt></dt>
              <dd>{property.city}, {property.state}</dd>
              <dt>SQFT:</dt>
              <dd>{property.sqft}</dd>
              <dt>Bedrooms</dt>
              <dd>{property.bedrooms}</dd>
              <dt>Bathrooms</dt>
              <dd>{property.bathrooms}</dd>
              <dt>Value</dt>
              <dd>${property.value}</dd>
              
            </dl>
            {/* State: If User is Owner and Logged in*/}
            {Auth.loggedIn() && isOwner ? (
               
               
              !hasImg ? (
              <form onSubmit={submitImg}>
                {/*If the property does NOT have an image, then display img form:  */}
                <input
                  filename={file} 
                  onChange={e => setFile(e.target.files[0])} 
                  type="file" 
                  accept="image/*"
                ></input>
                
                <button type="submit">Submit</button>
              </form>
              ) : forSale ? (
                <>
                {/*If the property IS forSale and user is owner  */}
                <h4>Listed for sale @ ${property.salePrice}</h4>
                <span>Cancel Sale of {property.address}?</span>
                <form onSubmit={cancelSale} method="post">
                   <button type="submit">Cancel Sale</button>
                </form>
                </>
              ):
                (
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
                  <button type="submit">List for sale</button>
                </form>
                </>
              )
            ) : 
          
            forSale && Auth.loggedIn() ? (
              <>
              {/*If the property IS forSale and user is NOT owner  */}
              <h4>Listed for sale @ ${property.salePrice}</h4>
              <span>Buy {property.address}?</span>
              <form onSubmit={buyProperty} method="post">
                 <button type="submit">Buy it!</button>
              </form>
              </>
            ): 
            forSale ? 
              (
              <>
              <h4>Listed for ${property.salePrice}</h4>
              <span>Login to buy</span>
              
              
              </>
            ) : (
              <span>Not Currently Listed For Sale.</span>
            )
          }
          </div> 
        </>
    )
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