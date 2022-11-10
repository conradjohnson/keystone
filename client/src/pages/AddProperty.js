import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


function AddProperty(props){

    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }
    const [formState, setFormState] = useState({ email: '', password: '' });

    return (
        Auth.loggedIn() ? (
        <>
          <div className="container my-1">
           Add Property Form here
           <form><input type="text" name="address" placeholder="123 Main" />
           <button type="submit" value="submit!">nnnn</button></form>
          </div>
        </> 
        ) : null )
            
}

export default AddProperty;