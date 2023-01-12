import {useState, useEffect} from "react"
import {patchCommentVotes} from "../api"

function CommentVotes({comment}) {
    const [votes, setVotes] = useState(0)
    const [isVoteError, setIsVoteError] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)
    const [hasVotedError, setHasVotedError] = useState(false)

    useEffect(() => {
        setVotes(comment.votes)
    },[comment.votes])

    function incVotes(inc) {
        setHasVotedError(false)
        if(!hasVoted) {
        setIsVoteError(false);
        setHasVoted(true)
        setVotes((currentVotes) => currentVotes + inc);
        patchCommentVotes(comment.comment_id, {inc_votes: inc}).catch(e => {
            setVotes(comment.votes)
            setIsVoteError(true)
            setHasVoted(false)
        });
    } else {
        setHasVotedError(true)
    }
    }

    return <div className="review__Votes">
    {hasVotedError ? <p className="errorMessage">You can only vote on each review once</p> : null}
    {isVoteError ? <p className="errorMessage">Error updating votes</p> : null}
    <p>Votes: {votes}</p>
    <button type="button" onClick={() => {incVotes(1)}}>👍</button>
    <button type="button" onClick={() => {incVotes(-1)}}>👎</button>
</div>


}

export default CommentVotes