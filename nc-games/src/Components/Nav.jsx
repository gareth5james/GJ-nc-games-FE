import { useEffect } from "react"
import {Link} from "react-router-dom"
import { getCategories } from "../api"

function Nav({user, categories, setCategories}) {
    useEffect(() => {
        getCategories().then(categories => setCategories(categories))
    }, [])

    return <nav>
        {categories.map(category => <Link className="Link" key={category.slug}to={`/categories/${category.slug}`}>{category.slug.replaceAll("-", " ")}</Link>)}
        { user ? <Link className="Link" to="/add">ADD A REVIEW</Link> : null }
    </nav>
}

export default Nav