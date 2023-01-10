import { useState, useEffect } from "react"
import { getComments, patchReviewVotes } from "../api"

function ReviewComments(reviewId) {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [votes, setVotes] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        getComments(reviewId).then(comments => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [reviewId])

    useEffect(() => {
        setVotes(review.votes)
    })

    function incVotes(inc) {
        patchReviewVotes(reviewId, {inc_votes: inc})
    }

    return <ul className="comments">
        {isLoading ? <p>Comments Loading</p> : comments.map(comment => {
            return <li key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>By: {comment.author}</p>
                <p>Votes: {comment.votes}</p>
                <button onClick={() => {incVotes(1)}}>👍</button><button onClick={() => {incVotes(-1)}}>👎</button>
            </li>
        })}
    </ul>
}

export default ReviewComments;