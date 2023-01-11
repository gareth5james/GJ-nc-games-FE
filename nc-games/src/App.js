import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Reviews from "./Components/Reviews";
import SingleReview from "./Components/SingleReview";
import Login from "./Components/Login";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Login user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Reviews />} />
        <Route
          path="/reviews/:reviewId"
          element={<SingleReview user={user} setUser={setUser} />}
        />
      </Routes>
    </div>
  );
}

export default App;
