import "./App.css";
import Header from "./Components/Header";
import Nav from "./Components/Nav";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes></Routes>
    </div>
  );
}

export default App;
