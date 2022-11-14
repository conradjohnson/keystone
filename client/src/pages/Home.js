import React, { useEffect }  from "react";
import PropertyWidget from "../components/PropertyWidget";
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
     {/*} <Map />*/}
     <div className="w-3/5 py-4 overflow-y-hidden">
          <img
            className="w-5/6 mx-auto slide-in-bottom"
            src= {mapPlaceholder}
          />
        </div>
    </div>
  );
};

export default Home;
