import {useState, useEffect} from "react"
import { getSingleReview, patchReviewVotes } from "../api"
import {Link, useParams} from "react-router-dom"
import ReviewComments from "./ReviewComments"


function SingleReview() {
    const {reviewId} = useParams();

    const [review, setReview] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [votes, setVotes] = useState(0)
    const [isVoteError, setIsVoteError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getSingleReview(reviewId).then(response => {
            setReview(response)
            setIsLoading(false)
        })
    },[reviewId])

    useEffect(() => {
        setVotes(review.votes)
    },[review.votes])

    function incVotes(inc) {
        setIsVoteError(false);
        setVotes((currentVotes) => currentVotes + inc);
        patchReviewVotes(reviewId, {inc_votes: inc}).catch(e => {
            setVotes(review.votes)
            setIsVoteError(true)
        });
    }

    return <main>
        {isLoading ? <p>Review Loading</p> : <div className="review">
            <div className="review__Header">
                <h2>{review.title}</h2>
                <p>Category: {review.category}</p>
                <p>Designer: {review.designer}</p>
            </div>
            <div className="review__Body">
                <img src={review.review_img_url} alt={review.title}/>
                <p>{review.review_body}</p>
            </div>
            <div className="review__Votes">
                {isVoteError ? <p className="errorMessage">Error updating votes</p> : null}
                <p>Votes: {votes}</p>
                <button onClick={() => {incVotes(1)}}>👍</button><button onClick={() => {incVotes(-1)}}>👎</button>
            </div>
            <div className="review__Comments">
                <p>Comments: {review.comment_count}</p>
                <ReviewComments reviewId={reviewId}/>
            </div>
            <Link to="/">Back to Reviews</Link>
            </div>}
    </main>
}

export default SingleReview