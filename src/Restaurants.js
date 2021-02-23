import React from 'react';
import { useState, useEffect } from 'react';
import queryString from 'query-string'; 
import { useHistory } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import './App.css';

function Restaurants(props) {

    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const history = useHistory();
    let query = queryString.parse(props.query);

    useEffect(()=>{
        let fetchString = `https://shielded-beyond-25498.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
        setRestaurants(null);
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

    function avg(grades) {
        let sum = 0;
        grades.forEach((grade) => {
            sum += grade.score;
        });
        sum /= grades.length;
        return sum.toFixed(2);
    }

    return (
        <div>
            <h1>Restaurant List</h1>
            <p>The list of all restaurants from the API. You can even search by borough!</p>
            {   
                restaurants == null
                ?
                <><h5><i>Loading..</i></h5></>
                :
                restaurants.length != 0
                ?
                <>
                 <table class="table" id="restaurant-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Cuisine</th>
                            <th>Address</th>
                            <th>Average Score</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        restaurants.map(restaurant=>(
                            <tr onClick={()=>{history.push(`/restaurant/${restaurant._id}`)}} class="restaurant" key={restaurant._id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.cuisine}</td>
                                <td>{restaurant.address.building} {restaurant.address.street}, {restaurant.borough}</td>
                                <td>{avg(restaurant.grades)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                
                <Pagination>
                    <Pagination.Prev onClick={()=>previousPage()} />
                        <Pagination.Item>
                            {page}
                        </Pagination.Item>
                    <Pagination.Next onClick={()=>nextPage()} />
               </Pagination>
               </>
                :
                <><h5>No restaurants with such borough.. Remember: letter case is important!</h5></>
            }
        </div>
    );
}

export default Restaurants;