import React,{ useContext} from 'react';
import { useHistory } from 'react-router-dom';

import classes from "./NewPlace.module.css";
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';


const NewPlace = (props) =>{
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest,clearError } = useHttpClient();
    const history = useHistory();


    const { formState, inputHandler } = useForm(
    {
        title:{
            value:'',
            isValid:false
        },
        description:{
            value:'',
            isValid:false
        },
        address:{
            value:'',
            isValid:false
        },
        image:{
            value: null,
            isValid:false
        }

    },false);

    const formSubmitHandler =async (event)=>{
        event.preventDefault();
        try{
            const formData = new FormData();
            formData.append('title',formState.inputs.title.value);
            formData.append('description',formState.inputs.description.value);
            formData.append('address',formState.inputs.address.value);
            formData.append('creator', auth.userId);
            formData.append('image',formState.inputs.image.value);
            console.log(auth.token);
            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token }
                );
            history.push('/');

        }catch(err){

        }
    }

   
    return (
        <form className={classes.placeform} onSubmit = {formSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators = {[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                errorText="Please enter a valid description (at least 5 characters)."
                validators = {[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
             />
            <Input
                id="address"
                element="input"
                label="Address"
                validators = {[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address."
                onInput={inputHandler}
            />
            <ImageUpload errorText = "Please choose q picture"
                        id="image" 
                        onInput= {inputHandler}/>
            <Button disabled ={!formState.formisVaild }> ADD PLACE</Button>

        </form>
    )
}

export default NewPlace;