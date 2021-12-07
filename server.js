const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
const path = require('path');
const API_KEY = '01ca5b812aa74ef5a91015f1f7646bec';


app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/api/recipes/:word', (req, res) => {
	const word = req.params.word;
	const request = unirest.get(`https://api.spoonacular.com/recipes/complexSearch?query=${word}&maxFat=25&number=5&apiKey=${API_KEY}`)
	.then(response => {
        const results = response.body;
		//const results = response.body.response[0].items || []; // grab array of results
		console.log(results);
		//res.json(results);
        res.send(results);
	})
	.catch(error => {
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