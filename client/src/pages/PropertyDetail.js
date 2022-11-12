import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_PROPERTY, QUERY_USER_PROPERTY, QUERY_PROPERTIES } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import axios from 'axios';

function PropertyDetail(){
 
    const navigate = useNavigate();
    const { id } = useParams();
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
    const [image, setImage] = useState(null);
    const [file, setFile] = useState();

    // submitImg image function 
    const submitImg = async event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("image", file)
        formData.append("propid", id)
        const result = await axios.post('/api/image-upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        setImage('/img/prop/'+result.data.filename)
      }
    

    return (
        
        <>
          <div className="container my-1">
            <h2>PropertyDetail: {id} </h2>
            <div>
              <h2></h2>
            </div>
            {hasImg ? (
               <img src={imgPath} width="400"/>
            ):(
              <img src="/img/defaultHome.png" alt="missing property photo" width="400" />
            ) }
           
            
            {Auth.loggedIn() ? (
            
            <form onSubmit={submitImg}>
              <input
                filename={file} 
                onChange={e => setFile(e.target.files[0])} 
                type="file" 
                accept="image/*"
              ></input>
              
              <button type="submit">Submit</button>
            </form>
            
            ) : (
              <div>Login</div>
            )}
          </div> 
        </>
    )
}

export default PropertyDetail;