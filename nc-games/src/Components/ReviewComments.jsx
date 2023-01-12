import { useState, useEffect } from "react"
import { getComments } from "../api"
import CommentVotes from "../Components/CommentVotes"

function ReviewComments({reviewId, hasPostedComment, comments, setComments}) {
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        setIsLoading(true)
        getComments(reviewId).then(comments => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [reviewId, hasPostedComment])

    return <ul className="comments">
        {isLoading ? <p>Comments Loading</p> : comments.map(comment => {
            return <li key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>By: {comment.author}</p>
                <CommentVotes comment={comment}/>
            </li>
        })}
    </ul>
}

export default ReviewComments;