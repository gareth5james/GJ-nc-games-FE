import {useState, useEffect} from "react"
import {patchReviewVotes} from "../api"

function ReviewVotes({review}) {
    const [votes, setVotes] = useState(0)
    const [isVoteError, setIsVoteError] = useState(false)

    useEffect(() => {
        setVotes(review.votes)
    },[review.votes])

    function incVotes(inc) {
        setIsVoteError(false);
        setVotes((currentVotes) => currentVotes + inc);
        patchReviewVotes(review.review_id, {inc_votes: inc}).catch(e => {
            setVotes(review.votes)
            setIsVoteError(true)
        });
    }

    return <div className="review__Votes">
    {isVoteError ? <p className="errorMessage">Error updating votes</p> : null}
    <p>Votes: {votes}</p>
    <button type="button" onClick={() => {incVotes(1)}}>👍</button>
    <button type="button" onClick={() => {incVotes(-1)}}>👎</button>
</div>


}

export default ReviewVotes