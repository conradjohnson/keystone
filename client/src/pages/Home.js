import React, { useEffect }  from "react";
import PropertyWidget from "../components/PropertyWidget";
import { useStoreContext } from '../utils/GlobalState';
import { useQuery } from '@apollo/client';
import { UPDATE_PROPERTIES } from '../utils/actions';
import { QUERY_PROPERTIES } from '../utils/queries';
//import spinner from '../../assets/spinner.gif';
const Home = () => {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PROPERTIES);

  
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
    <div className="container">
      
      <PropertyWidget />
     {/*} <Map />*/}
    </div>
  );
};

export default Home;
