import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NavLinks from "./NaviLinks";
import MainHeader from "./MainHeader";
import Backdrop from "../UIElements/Backdrop";
import SideDrawer from "./SideDrawer";
import { Fragment } from "react/cjs/react.production.min";

const MainNavigation = (props) => {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler =()=>{
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler =() => {
        setDrawerIsOpen(false);
    }


    return (
        <Fragment>
            {drawerIsOpen && <Backdrop onClick ={closeDrawerHandler}/>}
            <SideDrawer show={drawerIsOpen}>
                <nav className={classes.mainnavigationdrawernav}>
                        <NavLinks/>
                </nav>
            </SideDrawer>

            <MainHeader>
                <button className={classes.mainnavigationmenubtn} onClick={openDrawerHandler}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className={classes.mainnavigationtitle} >
                    <Link to="/">Your Places</Link>
                </h1>
                <nav className={classes.mainnavigationheadernav}>
                     <NavLinks/>
                </nav>
            </MainHeader>

        </Fragment>

    )
}

export default MainNavigation