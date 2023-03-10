import {useState, useEffect} from "react"
import { getSingleReview } from "../api"
import {Link, useParams} from "react-router-dom"
import ReviewComments from "./ReviewComments"
import ReviewVotes from "./ReviewVotes"
import NewComment from "./NewComment"

function SingleReview({user}) {
    const {reviewId} = useParams();

    const [review, setReview] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [reviewDate, setReviewDate] = useState("")
    const [hasPostedComment, setHasPostedComment] = useState(false)
    const [numComments, setNumComments] = useState(0)
    const [comments, setComments] = useState([])
    const [badReview, setBadReview] = useState(false)
    const [serverError, setServerError] = useState(null)

    useEffect(() => {
        setServerError(null)
        setIsLoading(true)
        setBadReview(false)
        getSingleReview(reviewId).then(response => {
            setReview(response)
            setIsLoading(false)
        }).catch(e => {
            if(e.response.status === 404) {
                setBadReview(true)
            } else {
                setServerError(`${e.response.status} ${e.response.statusText}`)
            }
        })
    },[reviewId])

    useEffect(() => {
        let newDate = new Date(review.created_at).toDateString();
        setReviewDate(newDate);
    }, [review.created_at])

    useEffect(() => {
        setNumComments(parseInt(review.comment_count));
    }, [review.comment_count])

    return <main> 
        { serverError ? <p>{serverError}</p> : null}
        {badReview ? <p>No such review</p>  : isLoading ? <p>Review Loading</p>: 
            <div className="review">
                <h2 className="review__Title">{review.title}</h2>
                <p>Category: {review.category}</p>
                <p>Designer: {review.designer}</p>
                <p>Written: {reviewDate}</p>
                <img src={review.review_img_url} alt={review.title}/>
                <p>{review.review_body}</p>
                <ReviewVotes review={review}/>
                <NewComment reviewId={reviewId} hasPostedComment={hasPostedComment} setHasPostedComment={setHasPostedComment} setNumComments={setNumComments} setComments={setComments} user={user}/>
                <p>Comments: {numComments}</p>
                <ReviewComments reviewId={reviewId} hasPostedComment={hasPostedComment} setHasPostedComment={setHasPostedComment} setComments={setComments} comments={comments} user={user}/>
            <Link to="/">Back to Reviews</Link>
            </div>}
    </main>
}

export default SingleReview