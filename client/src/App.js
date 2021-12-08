import React from 'react';
import axios from "axios";
import './App.css';
// Using axios to make data handling more efficient. Calls such as 
// Get, Post, and Delete are made easier thanks to this framework.

function App() {
  const [word, setWord] = React.useState('software');
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
// Render the api data using nodules where you can view the recipe or leave a review. 
  return (
    <div className="app">
      <header>
        <h1>Recipe Review App!</h1>
      </header>

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
                  <h2>{response.title}</h2>
                  <img src={response.image} alt={response.title} />
                  <button>Review Recipe!</button>
                </div>
            ))}
            
          </div>
      )} 
    </div>
  );
}

export default App;