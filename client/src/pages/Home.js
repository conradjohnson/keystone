import React, { useEffect }  from "react";
import PropertyWidget from "../components/PropertyWidget";
import Map from "../components/Map";
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { UPDATE_PROPERTIES } from '../utils/actions';
import { QUERY_PROPERTIES, QUERY_SALE_PROPERTIES } from '../utils/queries';
import mapPlaceholder from '../assets/map-placeholder.gif'
//import spinner from '../../assets/spinner.gif';
const Home = () => {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_SALE_PROPERTIES, {
    variables: {
      "forSale": true}});

  
  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PROPERTIES,
        properties: data.properties,
      });
      
    } else if (!loading) {
      
    }
  }, [data, loading, dispatch]);



  return (
    <div className="pt-6 px-6 mx-auto flex flex-wrap flex-row items-center justify-center justify-around">
      
      <PropertyWidget />
      <Map />
     
    </div>
  );
};

export default Home;
