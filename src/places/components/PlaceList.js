import React from 'react';

import classes from './PlaceList.module.css';
import PlaceItem from './PlaceItem';
import Card from '../../shared/components/UIElements/Card';

const PlaceList = (props) =>{
    if(props.leength == 0){
        return (
            <div className={`${classes.placelist}`}>
                <Card>
                    <h2>No places found. Maybe create one?</h2>
                    <button>Share Place</button>
                </Card>

            </div>
        )
    }

    return (
        <ul className={classes.placelist}>
            {props.items.map(place => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />))}

          
        </ul>

    )
};


export default PlaceList;