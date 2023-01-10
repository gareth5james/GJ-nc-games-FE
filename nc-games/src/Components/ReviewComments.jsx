import { useState, useEffect } from "react"
import { getComments } from "../api"

function ReviewComments({reviewId, hasPostedComment}) {
    const [comments, setComments] = useState([])
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
                <p>Votes: {comment.votes}</p>
                <button>👍</button><button>👎</button>
            </li>
        })}
    </ul>
}

export default ReviewComments;