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
            <div className="flex flex-col h-contain w-2/5 items-center rounded shadow-lg">
              <h2 className="my-4 text-5xl text-purple-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">Homes for sale:</h2>
              {state.properties.length ? (
                <div className="max-h-screen overflow-y-scroll snap snap-y snap-mandatory no-scrollbar slide-in-bottom-h1">
                  {filterProperties().map((property) => ( 
                    
                    <div className="max-w-sm justify-center overflow-hidden border-2 border-purple-800 bounce-top-cards snap-start my-4" key={property._id}>
                      <div className="px-6 py-4">
                      <a className="font-bold text-xl mb-2 text-center" href={"/property/" + property._id}>
                     {property.address}
                     <img className="w-full"
                  src={"/img/prop/" + property.images[0]}
                  alt="Property Picture"/>
                      <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Value: {property.value} </div>
                      <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Price: {property.salePrice} </div>
                      </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h3>No Properties</h3>
              )}
             
            </div>
          );

}

export default PropertyWidget;