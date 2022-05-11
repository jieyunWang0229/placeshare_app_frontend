import React, { useState, useContext, Fragment } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import classes from './Auth.module.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';


const Auth =(props) =>{
    const  auth= useContext(AuthContext);
    const [ isLogInMode, setisLogInMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const { formState,  inputHandler, setFormData} = useForm(
        {
            email: {
              value: '',
              isValid: false
            },
            password: {
              value: '',
              isValid: false
            }
          },
          false
    )
    const switchModeHandle =(pre) =>{
        if(!isLogInMode){
            setFormData(
                { ...formState.inputs,
                    name: undefined,
                    image: undefined

                }, 
                formState.inputs.email.isValid && formState.inputs.password.isValid
            )}
        else{
            setFormData(
                { ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    },
                    image:{
                        value: null,
                        isValid: false
                    }
                }, 
                false
            )
        };
        setisLogInMode(pre => !pre);
    }

    const authSumbitHandler= async (event)=>{
        event.preventDefault();
    
    
        if(isLogInMode){
            try{
                 
                 const responseData = await sendRequest( process.env.REACT_APP_BACKEND_URL + '/users/login',
                      'POST',
                        JSON.stringify({
                            email: formState.inputs.email.value,
                            password: formState.inputs.password.value
                        }),
                        { 'Content-Type': 'application/json'}
                    );
             
                auth.login(responseData.userId,responseData.token);

            }catch(err){
            
            };

        }else{
           
            try{
                 const formData = new FormData();
                 formData.append('email', formState.inputs.email.value);
                 formData.append('name', formState.inputs.name.value);
                 formData.append('password', formState.inputs.password.value);
                 formData.append('image', formState.inputs.image.value);
        
                const responseData = await sendRequest( process.env.REACT_APP_BACKEND_URL + '/users/signup',
                     'POST',
                     formData,
                   
                     
                );
        
                auth.login(responseData.userId, responseData.token);

            }catch(err){
             
            };

        }
    }

   


    return (
        <Fragment>
        <ErrorModal error={error} onClear={ clearError }/>
        <Card className ={classes.authentication}>
            <form onSubmit={authSumbitHandler}>
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login Required</h2>
            <hr />
                {!isLogInMode && <Input
                     element ="input"
                     id="name"
                     type ="text"
                     label ="name"
                     validators ={[VALIDATOR_REQUIRE()]}
                     errorText = "Please enter a valid name."
                     onInput = {inputHandler}
                ></Input>}
                {!isLogInMode && <ImageUpload 
                        errorText = "Please choose q picture"
                        id="image" 
                        onInput= {inputHandler}/>}
                <Input
                  element ="input"
                  id="email"
                  type ="email"
                  label ="email"
                  validators ={[VALIDATOR_EMAIL()]}
                  errorText = "Please enter a valid email address."
                  onInput = {inputHandler}
                ></Input>
                <Input
                    element ="input"
                    id="password"
                    type ="password"
                    label ="password"
                    validators ={[VALIDATOR_MINLENGTH(5)]}
                    errorText = "Please enter a valid password, at least 5 characters."
                    onInput = {inputHandler}
                ></Input>
                <Button type="submit" disabled={!formState.formisVaild}>{isLogInMode? 'LOG IN' : 'SIGN UP'}</Button>
            </form>
            <Button inverse onClick={switchModeHandle}>SWITCH {isLogInMode? 'SIGN UP' : 'LOG IN'}</Button>
        </Card>
        </Fragment>
    )
}

export default Auth;