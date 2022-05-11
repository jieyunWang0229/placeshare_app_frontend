import React,{ useReducer, useEffect} from 'react'

import classes from './Input.module.css';
import { validate } from '../../util/validators';


const inputReducer =(state,action)=>{
    switch (action.type){
        case 'CHANGE':
            return {
                value : action.val,
                isTouched: state.isTouched,
                isValid: validate(state.value,action.validators) 
            };
        case 'BLUR':
            return {
                value : state.value,
                isTouched: true,
                isValid:  validate(state.value,action.validators) 
            };
        default:
            console.log('default');
            return state;

    }
};


const Input = (props) =>{
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
      });


    
      const { id, onInput } = props;
      const { value, isValid } = inputState;
    
      useEffect(() => {
        onInput(id, value, isValid)
      }, [id, value, isValid, onInput]);
    
      const changeHandler = event => {
        dispatch({
          type: 'CHANGE',
          val: event.target.value,
          validators: props.validators
        });
      };


    const blurHandler = (event) =>{
        dispatch({
            type:'BLUR',
            validators: props.validators
        })
    }



    const element = props.element === 'input' ? (
        <input
            id={props.id}
            type = {props.type}
            placeholder = { props.placeholder}
            onChange = {changeHandler}
            onBlur ={blurHandler}
            value ={inputState.value}
        />
    ) : (
        <textarea 
            id={props.id}
            rows = {props.rows || 3}
            onChange = {changeHandler}
            onBlur ={blurHandler}
            value ={inputState.value}
        />

    );

    return (
        <div className={`${classes.formcontrol}  ${(!inputState.isValid && inputState.isTouched) ? classes.formcontrolinvalid: null}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {(!inputState.isValid && inputState.isTouched) && <p>{props.errorText}</p>}
        </div>

    )
}

export default Input;