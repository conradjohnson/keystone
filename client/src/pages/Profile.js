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
          <div className="container my-1">
            <h3>Profile: {user.name}</h3>
            <h4>Email: {user.email}</h4>
            <br/><br/>
            <h4>{user.name}'s Properties</h4>
            <ul>
            {user.properties &&
            user.properties.map((property) => (
              <li key={property._id}><a href={"/property/"+property._id}>{property.address}</a></li>
            ))}
            </ul>
            
          </div>
        </>) : null )
            
}

export default Profile;