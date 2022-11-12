
import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_PROPERTY } from '../utils/queries';
import { useStoreContext } from '../utils/GlobalState';
import axios from 'axios';
export default async function PropertyDetail2 () {


    return(<div>Hello world!</div>)


}