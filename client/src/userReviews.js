import Axios from 'axios';
import React from 'react';
function UserReviews() {
    const [reviews, setReviews] = React.useState([]);

    function getReviews() {
        Axios.get('/getReviews')
        .then(response => {
            console.log(response.data);
            setReviews(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (<div>
        <button onClick={getReviews}>Display User Reviews</button>
        <div className="userReviews">
            {reviews.map((review, index) => (
                <div className="userReview" key ={'review' + index}>
                    <h2>{review.recipeName}</h2>
                    <h4>"{review.userReview}"</h4>
                    <h4>Likes: {review.likes}</h4>
                    <button className="likePost">👍</button>
                </div>
            ))}
        </div>
    </div>)
}

export default UserReviews;