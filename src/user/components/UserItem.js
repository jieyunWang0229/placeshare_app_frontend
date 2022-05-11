import React from "react";
import { Link } from "react-router-dom";

import classes from "./UserItem.module.css";
import Card from "../../shared/components/UIElements/Card";
import Avatar from "../../shared/components/UIElements/Avatar";

const UserItem =(props) =>{

    return(
        <li className={classes.useritem}>
            <Card className= {classes.useritemcontent}>
                <Link to={`/${props.id}/places`}>
                    <div className={classes.useritemimage}>
                        <Avatar image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`} alt={props.name}/>
                    </div>
                    <div className={classes.useriteminfo}>
                        <h2>{props.name}</h2>
                        <h3>
                            {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
                        </h3>
                    </div>
                </Link>
            </Card>

        </li>
    )
};

export default UserItem;
