import React,{ useEffect, useState, Fragment } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";


const Users = ()=>{
    const [ users, setUsers ] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    useEffect(()=>{
      const fetchData = async() =>{
        try{
           const responseData = await sendRequest( process.env.REACT_APP_BACKEND_URL + '/users');
           setUsers(responseData.users);
        }catch(err){

        }
      };
      fetchData();
    },[sendRequest])


    return(
      <Fragment>
        <ErrorModal error={error} onClear = {clearError}/>
        {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
         { !isLoading && users && <UserList items = {users}/> }
      </Fragment>
        
    )

};

export default Users;