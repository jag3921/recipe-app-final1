import React from 'react';
import axios from "axios";
import RecipeNodule from './components/recipeNodule';


function SearchPage() {
    const [word, setWord] = React.useState('Search for food');
    const [responses, setResponses] = React.useState(null);
  // Get Api with additional parameters. Set the response variable to the api data.
    const getApi = () => {
      axios.get('/api/recipes/' + word)
      .then(response =>{
        console.log(response.data.results);
        setResponses(response.data.results);
      })
      .catch(error => console.log(error));
    };
    return (
    <div>
    <div className="inputContainer">
        <input value={word} onChange={e => setWord(e.target.value)} />
        <button onClick={getApi}>Search</button>
      </div>
      
      {responses && (
        responses.length === 0
        ? <p>No results for '{word}'.</p>
        : <div className="resultsContainer">
            {responses.map((response, index) => (
              <div className="recipeNodule" key={index} >
                  <RecipeNodule obj={response}/>
                </div>
            ))}
          </div>
      )}
     </div>
      );
}

export default SearchPage;