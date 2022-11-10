import React, { useEffect } from 'react';

import { useStoreContext } from '../../utils/GlobalState';
import spinner from '../../assets/spinner.gif';

function PropertyWidget() {
    const [state, dispatch] = useStoreContext();
    const { currentCategory } = state;

   

      function filterProperties() {
        //future function to filter based on conditions... forSale, NoNFT, etc...
        if (true) {
          return state.properties;
        }
      }

        return (
            <div className="my-2">
              <h2>House List:</h2>
              {state.properties.length ? (
                <div className="flex-row">
                  {filterProperties().map((property) => (
                    <li key={property._id}>
                      _id={property._id}
                      images={property.image}
                      address={property.address}
                      value={property.value}
                      price={property.forSale}
                      
                    </li>
                  ))}
                </div>
              ) : (
                <h3>No Properties</h3>
              )}
             
            </div>
          );

}

export default PropertyWidget;