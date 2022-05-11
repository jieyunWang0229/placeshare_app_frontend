import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import classes from './Modal.module.css';
import Backdrop from './Backdrop.js';
import { Fragment } from 'react/cjs/react.production.min';

const ModalOverlay = (props) =>{
   const content = (
       <div className={`${classes.modal} ${props.className}` } style={props.style}>
           <header className={`${classes.modalheader} ${props.headerClass}`}>
                <h2>{props.header}</h2>
           </header>
           <form onSubmit={ props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
               <div className={`${classes.modalcontent} ${props.contentClass}`}>
                   {props.children}
               </div>
               <footer className={`${classes.modalfooter} ${props.footerClass}`}>
                    {props.footer}
               </footer>
           </form>
       </div>
   )

    return ReactDOM.createPortal(content,document.getElementById('modal-hook'));
}




const Modal = (props)=>{

    return(
        <Fragment>
            {props.show && <Backdrop onClick = {props.onCancel}/>}
            <CSSTransition
                in = {props.show}
                timeout = {200}
                mountOnEnter
                unmountOnExit
                classNames="modal"
            >
                <ModalOverlay {...props}/>
            </CSSTransition>
        </Fragment>

    )
}

export default Modal;

