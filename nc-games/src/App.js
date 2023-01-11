import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import Reviews from "./Components/Reviews";
import SingleReview from "./Components/SingleReview";
import ReviewsByCategory from "./Components/ReviewsByCategory";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Reviews />} />
        <Route path="/reviews/:reviewId" element={<SingleReview />} />
        <Route path="/categories/:category" element={<ReviewsByCategory />} />
      </Routes>
    </div>
  );
}

export default App;
