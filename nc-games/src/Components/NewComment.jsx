import { useState } from "react";
import { postComment } from "../api";

function NewComment({reviewId, hasPostedComment, setHasPostedComment, setNumComments, setComments}) {
    const [newComment, setNewComment] = useState("");
    const [isPostingError, setIsPostingError] = useState(false)
    const [hasPosted, setHasPosted] = useState(false)
    const [hasPostedError, setHasPostedError] = useState(false)
    const [zeroLength, setZeroLength] = useState(false)
    const [user, setUser] = useState("grumpy19")

    function handleSubmit(event) {
        event.preventDefault();
        setZeroLength(false)
        setHasPostedComment(false);
        setHasPostedError(false);
        if(!hasPosted && newComment.length !== 0) {
            setComments(curr => [newComment, ...curr])
            setNumComments((curr) => curr + 1)
            setHasPosted(true);
            postComment(user, reviewId, newComment).then(response => {
                setHasPosted(false)
                setHasPostedComment(true)
                setNewComment("")
                event.target.reset();
            }).catch(e => {
                setComments(curr => curr.slice(-(curr.length - 1)))
                setIsPostingError(true)
                setHasPosted(false)
                setNumComments((curr) => curr - 1)
            })
        } else {
            if(newComment.length === 0) {
                setZeroLength(true)
            } else {
                setHasPostedError(true);
                setHasPosted(false)
            }
        }
        
    }

    return <form className="newComment" onSubmit={(event) => {handleSubmit(event)}} disabled={hasPosted}>
        {zeroLength ? <p>Please enter comment to be posted</p> : null }
        {hasPostedComment ? <p>Comment Posted!</p> : null}
        {isPostingError ? <p>Something went wrong, please try again</p> : null}
        {hasPostedError ? <p>You have already posted, please wait</p> : null}
        <textarea className="newComment__Field" onChange={(event) => {setNewComment(event.target.value)}}/>
        <button className="newComment__Button">Add a new comment</button>
    </form>
}

export default NewComment