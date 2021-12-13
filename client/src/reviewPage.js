import Axios from 'axios';
import { useLocation } from 'react-router';
import React from 'react';

function ReviewPage() {
    const location = useLocation();
    const [review, setReview] = React.useState("");

    function sendData() {
        submit(location.state.recipe, location.state.id, review, location.state.img,0);
    }
    return (
        <div className="reviewSection">
           <h1>Leave a review for {location.state.recipe}</h1>
           <textarea className="reviewBox" cols="50" rows="10" onChange={e => {setReview(e.target.value); console.log(location.state)}}></textarea>
           <button className="sendReview" onClick={sendData}>Submit</button>
        </div>
    );
}
// Axios post with user review data
function submit(name, recipeid, userreview,img, likes) {
    Axios.post('/submitReview', {
        recipeName: name,
        recipeId: recipeid,
        userReview: userreview,
        recipeImg: img,
        likes: likes
    }).then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
}

export default ReviewPage;