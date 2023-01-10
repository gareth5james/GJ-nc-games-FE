import {useState, useEffect} from "react"
import { getSingleReview } from "../api"
import {Link, useParams} from "react-router-dom"
import ReviewComments from "./ReviewComments"
import ReviewVotes from "./ReviewVotes"



function SingleReview() {
    const {reviewId} = useParams();

    const [review, setReview] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [reviewDate, setReviewDate] = useState("")

    useEffect(() => {
        setIsLoading(true)
        getSingleReview(reviewId).then(response => {
            setReview(response)
            setIsLoading(false)
        })
    },[reviewId])

    useEffect(() => {
        let newDate = new Date(review.created_at).toDateString();
        setReviewDate(newDate);
    }, [review.created_at])

    return <main>
        {isLoading ? <p>Review Loading</p> : <div className="review">
                <h2>{review.title}</h2>
                <p>Category: {review.category}</p>
                <p>Designer: {review.designer}</p>
                <p>Written: {reviewDate}</p>
            </div>
            <div className="review__Body">
                <img src={review.review_img_url} alt={review.title}/>
                <p>{review.review_body}</p>
            <ReviewVotes review={review}/>
                <p>Comments: {review.comment_count}</p>
                <ReviewComments reviewId={reviewId}/>
            <Link to="/">Back to Reviews</Link>
            </div>}
    </main>
}

export default SingleReview