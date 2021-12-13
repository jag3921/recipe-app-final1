const express = require('express');
const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3001;
const unirest = require("unirest");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const ReviewModel = require('./models/Review');
const cors = require('cors');

const API_KEY = 'e81ee6c36e2e4cea958e42b93a28879e';
const dbURL = 'mongodb+srv://jacobUser:jacobPassword0@cluster0.tzvux.mongodb.net/RecipeApp';

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())
app.get("/getUser", (req, res) => {
	UserModel.find({}, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result)
		}
	});
});

// Get recipes by search word
app.get('/api/recipes/:word', (req, res) => {
	const word = req.params.word;
	const amount = req.params.amount;
	const request = unirest.get(`https://api.spoonacular.com/recipes/complexSearch?query=${word}&maxFat=25&number=25&apiKey=${API_KEY}`)
	.then(response => {
        // We just want the body of the response for this
        const results = response.body;
		// Send the results
        res.json(results);
	})
	.catch(error => { //Catch any errors
		console.log(`error=${error}`);
		res.json({status:"Error", message: `${error}`});
	});
});

// Get recipe by ID
app.get('/api/review/:id', (req, res) => {
	const id = req.params.id;

	const request = unirest.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
	.then(response => {
		const results = response.body;
		res.json(results);
	})
	.catch(error => {
		res.json(error);
	})
})

// Create an account for recipe app. Saves requested data to database
// and returns json data. 
app.post("/createAccount", async (req, res) => {
	const account = req.body;
	const newAccount = new UserModel(account);
	await newAccount.save().catch(error => {res.json(error)});

	res.json(account);
});

// Post a review
app.post("/submitReview", async (req, res) => {
	const review = req.body;
	const newReview = new ReviewModel(review);
	await newReview.save().catch(error => {res.json(error)})

	res.json(review);
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });


mongoose.connect(dbURL);
app.listen(port, () => {
  console.log(`Recipe-app listening on port ${port}`);
});