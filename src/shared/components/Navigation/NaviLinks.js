import React,{ useContext} from "react";
import { NavLink } from "react-router-dom";

import classes from "./NaviLinks.module.css";
import { AuthContext } from "../../context/auth-context";


const NavLinks = (props) =>{
    const auth= useContext(AuthContext);

    return (
        <ul className={classes.navlinks}>
            <li>
                <NavLink to="/" exact>All USERS</NavLink>
            </li>
            {auth.isLoggedIn && (
                 <li>
                 <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
                </li>

            )}
           
            <li>
                <NavLink to="/places/new">ADD PLACES</NavLink>
            </li>
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>LOG OUT</button>
                </li>
            )}

        </ul>

    )
}

export default NavLinks;