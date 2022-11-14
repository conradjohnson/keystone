import React, { useState, useEffect, useRef } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { ADD_PROPERTY } from "../utils/mutations";

let autoComplete;
const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
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
    {
      types: ["address"],
      componentRestrictions: { country: ["US"] },
      fields: ["address_components", "geometry"],
    }
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

function AddProperty(props) {
  const navigate = useNavigate();
  const [addProperty, { error }] = useMutation(ADD_PROPERTY);

  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const [formState, setFormState] = useState({
    address: "",
    city: "",
    state: "",
    zip: "",
    value: "",
    description: "",
    imgURL: "",
  });

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
    for (const component of place.address_components) {
      const componentType = component.types[0];
      switch (componentType) {
        case "street_number": {
          addr1 = `${component.long_name}`;
          break;
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
              variables: { address: addr1, city: city, state: st, zip: zip, description:formState.description  },
            }); 
            console.log('mutationResponse:');
            console.log(mutationResponse);
            if (mutationResponse.data){
                navigate(`/property/${mutationResponse.data.addProperty._id}`);
            }
            
            
          } catch (e) {
            console.log(e);
          }

  case "route": {
          addr1 += " " + component.short_name;
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
    console.log(addr1 + city + st + zip);
    try {
      const mutationResponse = await addProperty({
        variables: { address: addr1, city: city, state: st, zip: zip },
      });
      console.log("mutationResponse:");
      console.log(mutationResponse);
      if (mutationResponse.data) {
        navigate(`/property/${mutationResponse.data.addProperty._id}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleAddressChange = () => {};

  const [textarea, setTextarea] = useState(
    "An amazing new home! "
  );

  return Auth.loggedIn() ? (
    <>
    
      <div className="flex flex-col pl-5 h-96 w-3/5 rounded shadow-lg bg-purple-100 ml-72">
        <div className="my-4 text-3xl text-purple-800 font-bold leading-tight items-center text-center slide-in-bottom-h1">
        <div className="bounce-top-cards">
          Add A New Property
          </div>
          </div>
          <div className="slide-in-bottom-h1 ml-32">
          <div className="bounce-top-cards flex-col my-3">
          <form onSubmit={handleFormSubmit} method="submit">
            <label className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left" htmlFor="fullAddress">Street Address: </label>
            <div className="my-3">
            <input
              ref={autoCompleteRef}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Enter a City"
              value={query}
              id="fullAddress"
              size="80"
            />
            </div>
            {/* <input
                ref={autoCompleteRef}
                onChange={event => setQuery(event.target.value)}
                placeholder="Enter a City"
                value={query}
            /><br/>
        */}

            {/* <input
              type="text"
              name="description"
              placeholder="property description"
            /> */}
            <div className="bounce-top-cards flex-col my-3">
            <label className="my-4 text-3xl text-purple-800 font-bold leading-tight text-left" htmlFor="description">Property Description: </label>
            <div className="my-3">
            <textarea value={textarea} name="description" onChange={handleChange} />
            </div>
            </div>
            <div>
            <button
              className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 my-3 border-b-4 border-purple-700 hover:border-purple-500 rounded bounce-top-cards slide-in-bottom-h1"
              type="submit"
            >
              Submit
            </button>
            </div>
          </form>
        </div>
        </div>
      </div>
      
    </>
  ) : null;

}

export default AddProperty;
