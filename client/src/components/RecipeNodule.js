import React from 'react';
import { useNavigate } from 'react-router';

function RecipeNodule(props) {
    let navigate = useNavigate();
    function RouteToRecipe() {
        navigate('/recipePage', {
            state: {id: props.obj.id}
        });
    }
    return (
    <div>
        <h2>{props.obj.title}</h2>
        <img src={props.obj.image} alt={props.obj.title} />
        <button onClick={RouteToRecipe} >Get Recipe!</button>
    </div>
    )
}


export default RecipeNodule;