import React from 'react';
import axios from 'axios';

function recipeNodule(props) {
    return (
    <div>
        <h2>{props.obj.title}</h2>
        <img src={props.obj.image} alt={props.obj.title} />
        <button onClick={() =>{reviewAPI(props.obj.id)}} >Get Recipe!</button>
    </div>
    )
}

function reviewAPI(id) {
    let data;
    axios.get('/api/review/' + id)
    .then(response => {
        console.log(response.data);
        data = response.data;
        return  (
            <div className="app">
                <p>{data.instructions}</p>
            </div>
        )
    })
    .catch(error => console.log(error));

    
}
export default recipeNodule;