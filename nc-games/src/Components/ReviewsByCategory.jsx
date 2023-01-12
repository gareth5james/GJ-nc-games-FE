import { useState, useEffect } from "react"
import {Link, useParams} from "react-router-dom"
import { getReviews } from "../api"
import SortBy from "../Components/SortBy"

function ReviewsByCategory({sortBy, setSortBy, orderBy, setOrderBy}) {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {category} = useParams()
    const [badCategory, setBadCategory] = useState(false)
    const [serverError, setServerError] = useState(null)

    useEffect(() => {
        setServerError(null)
        setBadCategory(false)
        setIsLoading(true)
        getReviews(sortBy, orderBy, category).then(items => {
            setItems(items)
            setIsLoading(false);
        }).catch(e => {
            setIsLoading(false)
            if(e.response.status === 404) {
                setBadCategory(true)
            } else {
                setServerError(`${e.response.status} ${e.response.statusText}`)
            }
            })
    }, [category, sortBy, orderBy])

    return <main>
            { serverError ? <p>{serverError}</p> : null}
            { badCategory ? <p>No such category</p> : <SortBy className="sort" sortBy={sortBy} setSortBy={setSortBy} orderBy={orderBy} setOrderBy={setOrderBy}/> }
            {isLoading ? <p>Reviews Loading</p> :  <ul className="reviewList">
                <Link className="Link" to="/">Back to all reviews</Link>
                {items.map(review => {
                    return <li key={review.review_id}>
                        <div className="reviewList__Header">
                            <p>Title: {review.title}</p>
                            <p className="reviewList__Header__Category">Category: {review.category.replaceAll("-", " ")}</p>
                            <p>Designer: {review.designer}</p>
                        </div>
                        <div className="reviewList__Body">
                            <p>{review.review_body}</p>
                            <p>By: {review.owner}</p>
                        </div>
                        <Link to={`/reviews/${review.review_id}`}>See More</Link>
                    </li>
                })}
            </ul> }
           
    </main>
}

export default ReviewsByCategory