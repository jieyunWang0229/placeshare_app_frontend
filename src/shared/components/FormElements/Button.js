import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = (props) =>{
    if (props.href) {
        return (
          <a
            className={`${classes.button} 
            ${props.inverse ? classes.buttoninverse : null} 
            ${props.danger ? classes.buttondanger : null}  
            ${props.size == "big" ? classes.buttonbig : classes.buttonsmall}` }
          >
            {props.children}
          </a>
        );
      }
      if (props.to) {
        return (
          <Link
            to={props.to}
            exact={props.exact}
            className={`${classes.button} 
            ${props.inverse ? classes.buttoninverse : null} 
            ${props.danger ? classes.buttondanger : null}  
            ${props.size == "big" ? classes.buttonbig : classes.buttonsmall}` }
          >
            {props.children}
          </Link>
        );
      }

    return (
        <button
            className={`${classes.button} 
                        ${props.inverse ? classes.buttoninverse : null} 
                        ${props.danger ? classes.buttondanger : null}  
                        ${props.size == "big" ? classes.buttonbig : classes.buttonsmall}` }
            type ={props.type}
            onClick = {props.onClick}
            disabled = {props.disabled}
        >
            {props.children}
        </button>

    )

}

export default Button;
