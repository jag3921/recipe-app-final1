import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import Axios from 'axios';
import React from 'react';
function RecipePage() {
    const {state} = useLocation();
    const {id} = state;
    const [data, setData] = React.useState({
        extendedIng: [],
        recipeName: '',
        instructions: '',
        imgUrl: ''
    });

 

    function loadApi() {
        Axios.get('/api/review/' + id)
        .then(response => {
            console.log(response.data);
            setData({
                extendedIng: response.data.extendedIngredients,
                recipeName: response.data.title,
                instructions: response.data.instructions,
                imgUrl: response.data.image
            })
            
        })
        .catch(error => {
            console.log(error);
        })
    }

    let navigate = useNavigate();
    function RouteToReview() {
        navigate('/reviewRecipe', {
            state: {recipe: data.recipeName, id: id, img: data.imgUrl}
        });
    }
    function CleanInstructions() {
        let instructions = data.instructions;
        instructions = instructions.replace('<li>', '');
        instructions = instructions.replace('</li>', '');
        instructions = instructions.replace('<ol>', '');
        instructions = instructions.replace('</ol>', '');


        return (<p>{instructions}</p>);
    }
    return (
        <div>
        <button onClick={loadApi}>Render Page</button>
        <button onClick={function() {console.log(data)}}>Dev Button</button>
        <h1>{data.recipeName}</h1>
        <img src={data.imgUrl} alt={data.recipeName} />
        <h2>Ingredients:</h2>
        
        {data.extendedIng && (
        data.extendedIng.length === 0
        ? <p></p>
        : <div className="ingredientsList">
            {data.extendedIng.map((response, index) => (
                <li key={index}>{response.name} ({response.measures.us.amount} {response.measures.us.unitLong})</li>
            ))}
          </div>
      )}
        <div className="instructions">
            <h2>Instructions: </h2>
              <CleanInstructions />
        </div>
        <button className="toReview" onClick={RouteToReview}>Review this Recipe!</button>
        </div>
    );
}

export default RecipePage;