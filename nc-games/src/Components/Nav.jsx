import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { getCategories } from "../api"

function Nav() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(categories => setCategories(categories))
    }, [])

    return <nav>
        {categories.map(category => <Link className="Link" key={category.slug}to={`/categories/${category.slug}`}>{category.slug.replaceAll("-", " ")}</Link>)}
    </nav>
}

export default Nav