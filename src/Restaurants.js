import React from 'react';
import { useState, useEffect } from 'react';
import queryString from 'query-string'; 
import { useHistory } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';

function Restaurants(props) {

    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const history = useHistory();
    let query = queryString.parse(props.query);

    useEffect(()=>{
        let fetchString = `https://shielded-beyond-25498.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
        query = queryString.parse(props.query);
        if (query.borough != null && query.borough != "") {
            fetchString += `&borough=${query.borough}`;
        }
        console.log(fetchString);
        fetch(fetchString).then(res=>res.json()).then(r => {
            if (!r.message) setRestaurants(r);
            else setRestaurants([]);
        });
    },[page, query.borough]);

    function previousPage() {
        if (page > 1) setPage(prev=>(prev-1));
    }

    function nextPage() {
        setPage(prev=>(prev+1));
    }

    return (
        <div>
            <h1>Restaurant List</h1>
            <p>The list of all restaurants from the API. You can even search by borough!</p>
            {
                restaurants.length != 0 
                ?
                <>
                <ListGroup variant="flush">
                    {
                        restaurants.map(restaurant=>(
                            <ListGroup.Item action onClick={()=>{history.push(`/restaurant/${restaurant._id}`)}} key={restaurant._id}><b>{restaurant.name}</b> - <i> {restaurant.address.building} {restaurant.address.street}, {restaurant.borough}</i> - <u>{restaurant.cuisine}</u></ListGroup.Item>
                        ))
                    }
                </ListGroup>
                
                <Pagination>
                    <Pagination.Prev onClick={()=>previousPage()} />
                        <Pagination.Item>
                            {page}
                        </Pagination.Item>
                    <Pagination.Next onClick={()=>nextPage()} />
               </Pagination>
               </>
                :
                <><h5><i>Nothing to see here..</i></h5></>
            }
        </div>
    );
}

export default Restaurants;