import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


function AddProperty(){
    return (
        <>
          <div className="container my-1">
           Add Property Form here
           <form><input type="text" name="address" placeholder="123 Main" />
           <button type="submit" value="submit!">nnnn</button></form>
          </div>
        </>)
            
}

export default AddProperty;