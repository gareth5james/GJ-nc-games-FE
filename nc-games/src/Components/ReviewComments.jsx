import { useState, useEffect } from "react"
import { getComments, deleteComment } from "../api"
import CommentVotes from "../Components/CommentVotes"

function ReviewComments({reviewId, hasPostedComment, comments, setComments, user}) {
    const [isLoading, setIsLoading] = useState(true)
    const [hasDeleted, setHasDeleted] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        getComments(reviewId).then(comments => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [reviewId, hasPostedComment])

    function delComm (commentId) {
        console.log("hello")
        setHasDeleted(true);
        setComments((curr) => [...comments].filter(comment => comment.comment_id !== commentId))
        deleteComment(commentId).then(() => {}).catch(e => {
            setHasDeleted(false)
            getComments(reviewId).then(comments => {
                setComments(comments)
            })
        })
    }

    return <ul className="comments">
        {isLoading ? <p>Comments Loading</p> : comments.map(comment => {
            return <li key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>By: {comment.author}</p>
                <CommentVotes comment={comment}/>
                {hasDeleted === false ? <p className="errorMessage">Something went wrong, please try again</p> : null}
                {user === comment.author ? <button className="comments__Delete" onClick={() => {delComm(comment.comment_id)}}>Delete Comment</button> : null }
            </li>
        })}
    </ul>
}

export default ReviewComments;