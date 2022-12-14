import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


function Profile(){


  const { loading, error, data } = useQuery( QUERY_USER);

    let user = {};
    if (data){
      user = data.user;
    }

    return (
        Auth.loggedIn() ? (
        <>
          <div className="flex flex-col px-5 h-contain w-3/5 rounded shadow-lg bg-purple-100 ml-72">
        
        {/* <div>
          <h3>Profile: {user.name}</h3>
          <h4>Email: {user.email}</h4>
          </div> */}
   
          <h4 className="my-4 text-5xl text-purple-800 font-bold leading-tight items-center text-center slide-in-bottom-h1">
            {user.name}'s Properties
          </h4>

          <div className="max-h-screen max-w-xl overflow-y-scroll snap snap-y snap-mandatory no-scrollbar slide-in-bottom-h1 bg-white ml-36">
          {user.properties &&
            user.properties.map((property) => (
              <div className="max-w-xl items-center overflow-hidden border-2 border-purple-800 bounce-top-cards snap-start my-4" key={property._id}>
                    <div className="px-6 py-4">
                    <a className="font-bold text-xl mb-2 text-center" href={"/property/" + property._id}>
                   {property.address}
                   <img className="w-full"
                  src={"/img/prop/" + property.images[0]}
                  alt="Property Picture"/>
                    <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Value: {property.value} </div>
                    <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Price: {property.forSale} </div>
                    </a>
                    </div>
                    </div>

            ))}
            </div>
                    <Link
            className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 m-3 border-b-4 border-purple-700 hover:border-purple-500 rounded text-center"
            to="/add-property"
          >
            Add A Property
          </Link>
      </div>
        </>) : null )
            
}

export default Profile;