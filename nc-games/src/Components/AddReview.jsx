import { useEffect, useState } from "react";
import { postReview } from "../api";
import { Link } from "react-router-dom";

function AddReview({user, categories}) {
    const [newReview, setNewReview] = useState({
        owner: user,
        title: "",
        review_body: "",
        designer: "",
        category: "strategy",
    })
    const [isValid, setIsValid] = useState(false)
    const [hasPosted, setHasPosted] = useState(false)
    const [isPostingError, setIsPostingError] = useState(false)

    useEffect(() => {
        newReview.owner = user
        setIsValid(false)
        if (user && newReview.title.length > 9 && newReview.review_body.length > 20 && newReview.designer.length > 4 && newReview.category) setIsValid(true)
    }, [newReview.category, user, newReview.title, newReview.review_body, newReview.designer])



    return <main>
        {!user ? <p>You must be logged in to post reviews</p> : null}
        {hasPosted ? <div>
            <p>Review Posted</p>
            <Link to="/">Back to Reviews</Link>
            </div> : <form className="newReview" onSubmit={event => {
            event.preventDefault();
            setIsPostingError(false)
            setHasPosted(true)
            postReview(newReview).then(() => {
                
            }).catch(e => {
                setIsPostingError(true)
                setHasPosted(false)
            })
        }}>
            {isPostingError ? <p className="errorMessage">Something went wrong, please try again</p> : null}
            <textarea id="title" placeholder="Title" rows="1" cols="20" value={newReview.title} onChange={(event) => {
                setNewReview((curr) => {
                    const temp = {...curr}
                    temp.title = event.target.value;
                    return temp
                })
            }}></textarea>

            <textarea id="designer" placeholder="Designer" rows="1" cols="20" value={newReview.designer} onChange={(event) => {
                setNewReview((curr) => {
                    const temp = {...curr}
                    temp.designer = event.target.value
                    return temp
                })
            }}></textarea>

            <div className="newReview__Category">
            <label htmlFor="category">Category: </label><select id="category" value={newReview.category} onChange={(event) => {
                setNewReview((curr => {
                    const temp = {...curr}
                    temp.category = event.target.value
                    return temp
                }))
            }}>
                {categories.map(category => <option key={category.slug} value={category.slug}>{category.slug.replaceAll("-", " ")}</option>)}
            </select>
            </div>

            <textarea  id="reviewBody" placeholder="Review" rows="5" cols="20"value={newReview.review_body} onChange={(event) => {
                setNewReview(curr => {
                    const temp = {...curr}
                    temp.review_body = event.target.value
                    return temp
                })
            }}></textarea>

            <button type="submit" disabled={!isValid}>Add Review</button>
        </form>}
    </main>
}

export default AddReview;