import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


function Profile(){
    return (
        Auth.loggedIn() ? (
        <>
          <div className="container my-1">
            <Link to="/">← Back to Home</Link>
            <Link to="/add-property">Add Property</Link>
          </div>
        </>) : null )
            
}

export default Profile;