const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
const path = require('path');
const API_KEY = '01ca5b812aa74ef5a91015f1f7646bec';
const dbURL = 'mongodb+srv://jacobUser:jacobPassword0@cluster0.tzvux.mongodb.net/RecipeApp';

app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/api/recipes/:word', (req, res) => {
	const word = req.params.word;
	const request = unirest.get(`https://api.spoonacular.com/recipes/complexSearch?query=${word}&maxFat=25&number=10&apiKey=${API_KEY}`)
	.then(response => {
        // We just want the body of the response for this
        const results = response.body;
		// Send the results
        res.send(results);
	})
	.catch(error => { //Catch any errors
		console.log(`error=${error}`);
		res.json({status:"Error", message: `${error}`});
	});
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
app.listen(port, () => {
  console.log(`Recipe-app listening on port ${port}`);
});