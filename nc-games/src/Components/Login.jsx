function Login ({user, setUser}) {
    return <div>
        {user !== null? <p>Logged in as {user}</p> : null}
        <button className="login" onClick={() => {setUser("grumpy19")}}>Login</button>
        </div>
}

export default Login