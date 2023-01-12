import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Reviews from "./Components/Reviews";
import SingleReview from "./Components/SingleReview";
import ReviewsByCategory from "./Components/ReviewsByCategory";
import Login from "./Components/Login";
import NoPath from "./Components/NoPath";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [sortBy, setSortBy] = useState(undefined);
  const [orderBy, setOrderBy] = useState("asc");

  return (
    <div className="App">
      <Header />
      <Nav />
      <Login user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Reviews
              sortBy={sortBy}
              setSortBy={setSortBy}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
          }
        />
        <Route
          path="/categories/:category"
          element={
            <ReviewsByCategory
              sortBy={sortBy}
              setSortBy={setSortBy}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
          }
        />
        <Route
          path="/reviews/:reviewId"
          element={<SingleReview user={user} setUser={setUser} />}
        />
        <Route path="/*" element={<NoPath />} />
      </Routes>
    </div>
  );
}

export default App;
