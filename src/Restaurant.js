import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

function Restaurant(props) {

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        fetch(`https://shielded-beyond-25498.herokuapp.com/api/restaurants/${props.id}`).then(res=>res.json()).then(r=>
        {
            setRestaurant(null);
            setLoading(false);
            if (!r.message) {
                setRestaurant(r);
            } else setRestaurant(null);
        });
    },[props.id]);

    return (
        <div>
            {
                loading
                ?
                <><h1><i>Loading..</i></h1><p>Wait a bit... If this is not gone, try refreshing.</p></>
                :
                restaurant != null
                ?
                <>
                <h1>{restaurant.name}</h1>
                <p>{restaurant.address.building} {restaurant.address.street}, {restaurant.borough}</p>
                <MapContainer style={{"height": "400px"}} center={[ restaurant.address.coord[1], restaurant.address.coord[0] ]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0] ]}></Marker>
                </MapContainer>
                <br />
                <h3>Grades:</h3>
                {
                restaurant.grades.length > 0
                ?
                <CardDeck>
                    {
                        restaurant.grades.map(grade=>(
                            <Card key={Math.random(64)}>
                                <Card.Body>
                                    <Card.Title>Grade: {grade.grade}</Card.Title>
                                    <Card.Text>
                                    Completed: { grade.date.substring(0, 10) }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </CardDeck>
                :
                <p>This restaurant has not received any grades yet.</p>
                }
                </>
                :
                <>
                <h1>Error..</h1>
                <p>Whoops! Maybe try again and see if it works?</p>
                </>
            }
        </div>
    );
}

export default Restaurant;