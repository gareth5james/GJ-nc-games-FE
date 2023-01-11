import { useState } from "react";
import { postComment } from "../api";

function NewComment({reviewId, hasPostedComment, setHasPostedComment, setNumComments, setComments, user}) {
    const [newComment, setNewComment] = useState("");
    const [isPostingError, setIsPostingError] = useState(false)
    const [hasPosted, setHasPosted] = useState(false)
    const [hasPostedError, setHasPostedError] = useState(false)
    const [zeroLength, setZeroLength] = useState(false)
    const [loginError, setLoginError] = useState(false)

    function handleSubmit(event) {
        event.preventDefault();
        setLoginError(false)
        setZeroLength(false)
        setHasPostedComment(false);
        setHasPostedError(false);
        setIsPostingError(false);
        console.log(user)
        if(!hasPosted && newComment.length !== 0 && user !== null) {
            setComments(curr => [newComment, ...curr])
            setNumComments((curr) => curr + 1)
            setHasPosted(true);
            postComment(user, reviewId, newComment).then(response => {
                setHasPosted(false)
                setHasPostedComment(true)
                setNewComment("")
            }).catch(e => {
                setComments(curr => curr.slice(-(curr.length - 1)))
                setIsPostingError(true)
                setHasPosted(false)
                setNumComments((curr) => curr - 1)
            })
        } else {
            if(newComment.length === 0) {
                setZeroLength(true); //error message displayed below if the newComment is empty
            } else if (user === null) {
                setLoginError(true);
            } else {
                setHasPostedError(true);
                setHasPosted(false);
            }
        }
        
    }

    return <form className="newComment" onSubmit={(event) => {handleSubmit(event)}} disabled={hasPosted}>
        {loginError ? <p className="errorMessage">You must be logged in to post</p> : null}
        {zeroLength ? <p className="errorMessage">Please enter comment to be posted</p> : null }
        {hasPostedComment ? <p className="successMessage">Comment Posted!</p> : null}
        {isPostingError ? <p className="errorMessage">Something went wrong, please try again</p> : null}
        {hasPostedError ? <p className="errorMessage">You have already posted, please wait</p> : null}
        <textarea className="newComment__Field" value={newComment} onChange={(event) => {setNewComment(event.target.value)}}/>
        <button className="newComment__Button">Add a new comment</button>
    </form>
}

export default NewComment