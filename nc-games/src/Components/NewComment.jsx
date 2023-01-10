import { useState } from "react";
import { postComment } from "../api";

function NewComment({reviewId, hasPostedComment, setHasPostedComment}) {
    const [newComment, setNewComment] = useState("");
    const [isPostingError, setIsPostingError] = useState(false)
    const [hasPosted, setHasPosted] = useState(false)
    const [hasPostedError, setHasPostedError] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        setHasPostedComment(false);
        setHasPostedError(false);
        if(!hasPosted) {
            setHasPosted(true);
            postComment(reviewId, newComment).then(response => {
                setHasPosted(false)
                setHasPostedComment(true)
                setNewComment("")
            }).catch(e => {
                setIsPostingError(true)
                setHasPosted(false)
            })
        } else {
            setHasPostedError(true);
            setHasPosted(false)
        }
        
    }

    return <form onSubmit={(event) => {handleSubmit(event)}}>
        {hasPostedComment ? <p>Comment Posted!</p> : null}
        {isPostingError ? <p>Something went wrong, please try again</p> : null}
        {hasPostedError ? <p>You have already posted, please wait</p> : null}
        <input type="text" onChange={(event) => {setNewComment(event.target.value)}}/>
        <button>Add a new comment</button>
    </form>
}

export default NewComment