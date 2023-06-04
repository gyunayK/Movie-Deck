import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "../Components/Card/Card";
import Search from "../Components/Search";
import Header from "../Components/Header/Header";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import About from "../Components/About/About";

//import "./App.css";

function App() {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("Iron Man 3");
  const [showSecond, setShowSecond] = useState(false);

  const apikey = import.meta.env.VITE_MOVIE_API_KEY;
  const url = `https://www.omdbapi.com/?t=${search}&plot=full&apikey=${apikey}`;

  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setMovie(data);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <BrowserRouter>
      <div className={`App ${showSecond ? "show-second" : ""}`}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search setSearch={setSearch} className="first" />
                <Card movie={movie} className="second" />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
