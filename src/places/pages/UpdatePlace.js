import React, { useEffect, useState, Fragment, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import  classes from './UpdatePlace.module.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';



const UpdatePlace = (props) =>{
    const auth = useContext(AuthContext);
    const placeId = useParams().placeId;
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError}= useHttpClient();
    const [ updatedPlace, setUpdatedPlace ] = useState();
    
    const { formState, inputHandler, setFormData } = useForm(
        {
            title: {
                value: '',
                isValid: false
              },
              description: {
                value: '',
                isValid: false
              }
    
        }, false);

   
    useEffect( () =>{
        const fetchData = async()=>{
          try{
              const responseData = await sendRequest( process.env.REACT_APP_BACKEND_URL + `/places/${placeId}`);
              setUpdatedPlace(responseData.place) ;
    
              setFormData({
                title: {
                    value: responseData.place.title,
                    isValid: true
                  },
                  description: {
                    value: responseData.place.description,
                    isValid: true
                  }
              }, true)
             
            }catch(err){
            }
        };
        fetchData();
        

    },[setFormData,sendRequest, placeId]);

    const updatePlaceHandler =async (event) =>{
      event.preventDefault();
      try{
        await sendRequest( process.env.REACT_APP_BACKEND_URL + `/places/${placeId}`,
                           'PATCH',
                           JSON.stringify({
                             title: formState.inputs.title.value,
                             description:formState.inputs.description.value
                           }),
                           { 'Content-Type': 'application/json',
                               Authorization: 'Bearer ' + auth.token 
                          }
        );


      }catch(err){

      }
      history.push('/'+ auth.userId + '/places');
    }

    if (!updatedPlace) {
      return (
        <div className="center">
          <Card>
            <h2>Could not find place!</h2>
          </Card>
        </div>
      );
    }
  
    if (isLoading) {
      return (
        <div className="center">
          <h2>Loading...</h2>
        </div>
      );
    }


    return (
      <Fragment>
        <ErrorModal error={error} onClear={clearError}/>
       {!isLoading && updatedPlace&&( <form className={classes.placeform} onSubmit={updatePlaceHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators = {[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue ={updatedPlace.title}
                initialValid ={true}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                errorText="Please enter a valid description (at least 5 characters)."
                validators = {[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                initialValue ={updatedPlace.description}
                initialValid ={true}
             />
            <Button disabled ={!formState.formisVaild }> SUBMIT</Button>
        </form>)}
      </Fragment>

    )
};

export default UpdatePlace;