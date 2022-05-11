import React,{ useEffect, useState, Fragment} from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';



const UserPlaces = (props) => {
    const [loadedPlaces, setLoadedPlaces ] = useState([]);
    const userId = useParams().userId;
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    useEffect(()=>{
      const fetchData = async() =>{
         const responseData = await sendRequest( process.env.REACT_APP_BACKEND_URL + `/places/user/${userId}`);
         setLoadedPlaces(responseData.places);
      };
      fetchData();
    },[sendRequest,userId])

    return (
      <Fragment>
        <ErrorModal error ={error} onClear={clearError}/>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedPlaces &&  <PlaceList items = {loadedPlaces}/>}
      </Fragment>
    )

   
}

export default UserPlaces;