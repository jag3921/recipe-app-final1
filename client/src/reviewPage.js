import Axios from 'axios';
import { useLocation } from 'react-router';
import React from 'react';

function ReviewPage() {
    const location = useLocation();
    const [review, setReview] = React.useState("");

    function test() {
        console.log("is working");
        submit(location.state.recipe, location.state.id, review, 0);
    }
    return (
        <div className="reviewSection">
           <h1>Leave a review for {location.state.recipe}</h1>
           <textarea className="reviewBox" cols="50" rows="10" onChange={e => {setReview(e.target.value); console.log(location.state)}}></textarea>
           <button className="sendReview" onClick={test}>Submit</button>
        </div>
    );
}
// Axios post with user review data
function submit(name, recipeid, userreview, likes) {
    Axios.post('/submitReview', {
        recipeName: name,
        recipeId: recipeid,
        userReview: userreview,
        likes: likes
    }).then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}

export default ReviewPage;