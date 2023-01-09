import {getReviews} from "../api"
import { useState, useEffect } from "react"

function Reviews() {
    const [items, setItems] = useState([])

    useEffect(() => {
        getReviews().then(data => {
            setItems(data)
        })
    }, [])

    return <main>
            <ul className="reviewList">
                {items.map(review => {
                    return <li key={review.review_id}>
                        <div className="reviewList-Header">
                            <p>Title: {review.title}</p>
                            <p>Category: {review.category}</p>
                            <p>Designer: {review.designer}</p>
                        </div>
                        <div className="reviewList-Body">
                            <p>{review.review_body}</p>
                            <p>By: {review.owner}</p>
                        </div>
                        <div>

                        </div>
                    </li>
                })}
            </ul>
    </main>
}

export default Reviews