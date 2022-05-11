import React from "react";

import classes from './UserList.module.css';
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";


const UserList = (props) =>{
    if(props.length ===0 ){
        return (
            <div className="center">
                <Card>
                    <h2>No users found</h2>
                </Card>
            </div>
        )
    }

    return (
        <ul className={classes.userslist}>
            {props.items.map( user => (
                 <UserItem
                    key = {user.id}
                    id = {user.id}
                    image = {user.image}
                    name = {user.name}
                    placeCount = {user.places.length}
                 />
                 )
            )}
        </ul>
    );
}

export default UserList;