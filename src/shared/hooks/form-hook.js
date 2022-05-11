import { useCallback,useReducer } from "react";

const formReducer = (state, action) =>{
    switch(action.type){
        case'INPUT_CHANGE' :
             let formValidty = true;
            for(const inputId in state.inputs){
                if (!state.inputs[inputId]) {
                    continue;
                  }
                if(inputId === action.inputId){
                    formValidty =  formValidty && action.isValid;
                }else{
                    formValidty = formValidty && state.inputs[inputId].isValid;
                }
            }
           
        return {
            ...state,
            inputs:{
                ...state.inputs,
                [action.inputId]:{
                    value: action.value,
                    isValid: action.isValid
                }
            },
            formisVaild: formValidty
        };
        case'SET_DATA':
            return {
                inputs: action.inputs,
                formisVaild: action.formisVaild
            }
        default:
            return state;
    }

};


export const useForm =(initialInputs, initalFormValidity) =>{

   const [formState, dispatch] = useReducer(formReducer,{
        inputs:initialInputs,
        formisVaild:initalFormValidity
    });

    const inputHandler =useCallback((id, value, isValid)=>{
        dispatch({
            type: 'INPUT_CHANGE',
            inputId: id,
            value: value,
            isValid: isValid,
        })
    },[]);

    const setFormData= useCallback((inputsData, formValidty) =>{
        dispatch({
            type: 'SET_DATA',
            inputs: inputsData,
            formisVaild: formValidty
        })
        console.log('set',inputsData)
    },[]);






    return {
        formState,
        inputHandler,
        setFormData
    }
}