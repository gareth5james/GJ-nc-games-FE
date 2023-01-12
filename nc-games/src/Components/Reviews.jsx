import {getReviews} from "../api"
import { useState, useEffect } from "react"
import SortBy from "../Components/SortBy"
import {Link} from "react-router-dom"

function Reviews({sortBy, setSortBy, orderBy, setOrderBy}) {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [serverError, setServerError] = useState(null)

    useEffect(() => {
        setServerError(null)
        setIsLoading(true)
        getReviews(sortBy, orderBy).then(items => {
            setItems(items)
            setIsLoading(false);
        }).catch(e => {
            setServerError(`${e.response.status} ${e.response.statusText}`)
        })
    }, [sortBy, orderBy])

    return <main>
            { serverError ? <p>{serverError}</p> : null}
            <SortBy className="sort" sortBy={sortBy} setSortBy={setSortBy} orderBy={orderBy} setOrderBy={setOrderBy}/>
            {isLoading ? <p>Reviews Loading</p> :  <ul className="reviewList">
                {items.map(review => {
                    return <li key={review.review_id}>
                        <div className="reviewList__Header">
                            <p>Title: {review.title}</p>
                            <p>Category: {review.category}</p>
                            <p>Designer: {review.designer} on: {new Date(review.created_at).toDateString()}</p>
                        </div>
                        <div className="reviewList__Body">
                            <p>{review.review_body}</p>
                            <p>By: {review.owner}</p>
                            <p>Votes: {review.votes}</p>
                            <p>Comments: {review.comment_count}</p>
                        </div>
                        <Link to={`/reviews/${review.review_id}`}>See More</Link>
                    </li>
                })}
            </ul> }
           
    </main>
}

export default Reviews