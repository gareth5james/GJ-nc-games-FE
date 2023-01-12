import {Link} from "react-router-dom" 

function Header () {
    return <Link className="App-header__Link" to="/"><header className="App-header">
        <h1>House of Games</h1>
    </header>
    </Link>
}

export default Header