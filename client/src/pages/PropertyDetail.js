import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_PROPERTY } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import axios from 'axios';

async function PropertyDetail(){
 

    const { _id } = useParams();
    const { loading, data } = useQuery(QUERY_PROPERTY, {
      variables: {_id: _id}
    });
    // get the property details from the DB!
  //  const property = data.property;
  //  const needsImg = (property.images.length === 0) ? false : true;
  
  const property = data?.property || {};
  console.log(property);
   // console.log("NeedsImg:" + needsImg);
    // Property Detail States:
    // Logged In
    // (Owner) - Needs Image
    // (Owner) - Needs NFT
    // (Owner) - List For Sale
    // (Owner) - Cancel Sale
    // (Visitor) - View Propety Detail
    // (Logged In Non-Owner) - If listed - buy
    // 

    // (Owner) - Needs Image
    // all image upload functions
    const [image, setImage] = useState(null);
    const [file, setFile] = useState();

    // submitImg image function 
    const submitImg = async event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("image", file)
        formData.append("propid", _id)
        const result = await axios.post('/api/image-upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        setImage('/img/prop/'+result.data.filename)
      }
    

    return (
        
        <>
          <div className="container my-1">
            <h2>PropertyDetail: {_id}</h2>
            <div>
              <h2></h2>
            </div>

           { Auth.loggedIn() ? (

            <form onSubmit={submitImg} method="post" accept="image/jpeg">
                <input type="hidden" name="propid" value={_id}/>
                <input
                filename={file} 
                onChange={e => setFile(e.target.files[0])} 
                type="file" 
                accept="image/*"
                ></input>
               
                <button type="submit">Submit</button>
            </form>
            ) : (
              <div>
                Other!
                </div>
            )
            }
        { image && <img src={image} />}
          </div>
        </>
    )
}

export default PropertyDetail;