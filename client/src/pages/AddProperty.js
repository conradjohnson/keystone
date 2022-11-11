import React, { useState, useEffect, useRef } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { ADD_PROPERTY} from '../utils/mutations';

let autoComplete;
const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
  
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }
  
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };


  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types:["address"],
      componentRestrictions:{'country':['US']},
      fields:['address_components', 'geometry'] }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    //console.log(addressObject);
  }
  

function AddProperty(props){

    const navigate = useNavigate();
    const [addProperty, { error }] = useMutation(ADD_PROPERTY);

    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);

    const [formState, setFormState] = useState({ address: '', city: '', state: '', zip: '', value:'', description:'', imgURL: '' });
    
    useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=AIzaSyDyfKCmxQxrQqrFnDgMSmj6xxhLnIkbuh8&libraries=places`,
          () => handleScriptLoad(setQuery, autoCompleteRef)
        );
      }, []);

    
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(autoComplete.getPlace());
        const place = autoComplete.getPlace();
        let addr1 = "";
        let city = "";
        let st = "";
        let zip = "";
        for (const component of place.address_components ) {
            const componentType = component.types[0];
            switch (componentType) {
              case "street_number": {
                addr1 = `${component.long_name}`;
                break;
              }
        
              case "route": {
                addr1 += " "+ component.short_name;
                break;
              }
        
              case "postal_code": {
                zip = `${component.long_name}`;
                break;
              }
            
              case "locality": {
                city = `${component.long_name}`;
                break;
    
              }
              case "administrative_area_level_1": {
                st = `${component.short_name}`;
                break;
              }
        
            
            }
          }
        console.log(addr1+city+st+zip);
        try {
           
            const mutationResponse = await addProperty({
              variables: { address: addr1, city: city, state: st, zip: zip  },
            }); 
            console.log('mutationResponse:');
            console.log(mutationResponse);
            if (mutationResponse.data){
                navigate(`/property/${mutationResponse.data.addProperty._id}`);
            }
            
            
          } catch (e) {
            console.log(e);
          }

    }
    const handleAddressChange = ()=>{

    }

    return (
        Auth.loggedIn() ? (
        <>
        <div className="search-location-input">
      
    </div>
          <div className="container my-1">
           Add Property Form here
           <form onSubmit={handleFormSubmit} method="submit">
           <label htmlFor="fullAddress">Street Address:</label>
           <input
                ref={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                placeholder="Enter a City"
                value={query}
                id="fullAddress"
                size="80"
                
            /><br/><br/>
           
          {/* <input
                ref={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                placeholder="Enter a City"
                value={query}
            /><br/>
        */}
            <input
              type="text"
              name="imgURL"
              placeholder="https://imghost.com/img.jpg"
            /><br/>
            <input
              type="text"
              name="description"
              placeholder="property description"
            /><br/>
            <input
             type="text"
             name="value"
             placeholder="$0?"
            /><br/>
            <button type="submit">submit!</button>
           </form>
          </div>
        </> 
        ) : null )
            
}

export default AddProperty;