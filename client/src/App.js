import React from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [word, setWord] = React.useState('software');
  const [responses, setResponses] = React.useState(null);

  const getApi = () => {
    axios.get('/api/recipes/' + word)
    .then(response =>{
      console.log(response.data.results);
      setResponses(response.data.results);
    })
    .catch(error => console.log(error))
  };

  return (
    <div className="app">
      <header>
        <h1>Recipe Review App!</h1>
      </header>
      
      <input value={word} onChange={e => setWord(e.target.value)} />
      <button onClick={getApi}>Search</button>
    
      {responses && (
        responses.length === 0
        ? <p>No results for {word}.</p>
        : <div>
          <ul>
            {responses.map((response, index) => (
              <div className=".recipeNodule" key={index}>
                  <h2>{response.title}</h2>
                  <img src={response.image} alt={response.title} />
                </div>
            ))}
            </ul>
          </div>
      )} 
    </div>
  );
}

export default App;