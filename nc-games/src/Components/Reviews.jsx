import {getReviews} from "../api"
import { useState, useEffect } from "react"

function Reviews() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getReviews().then(items => {
            setItems(items)
            setIsLoading(false);
        })
    }, [])

    return <main>
            {isLoading ? <p>Reviews Loading</p> :  <ul className="reviewList">
                {items.map(review => {
                    return <li key={review.review_id}>
                        <div className="reviewList__Header">
                            <p>Title: {review.title}</p>
                            <p>Category: {review.category}</p>
                            <p>Designer: {review.designer}</p>
                        </div>
                        <div className="reviewList__Body">
                            <p>{review.review_body}</p>
                            <p>By: {review.owner}</p>
                        </div>
                    </li>
                })}
            </ul> }
           
    </main>
}

export default Reviews