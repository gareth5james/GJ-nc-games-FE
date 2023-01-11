import { useState, useEffect } from "react"
import {Link, useParams} from "react-router-dom"
import { getReviews } from "../api"

function ReviewsByCategory() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {category} = useParams()

    useEffect(() => {
        setIsLoading(true)
        getReviews(category).then(items => {
            setItems(items)
            setIsLoading(false);
        })
    }, [category])

    return <main>
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