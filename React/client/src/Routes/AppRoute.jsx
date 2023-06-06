import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "../Components/Card/Card";
import Search from "../Components/Search/Search";
import Header from "../Components/Header/Header";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import About from "../Components/About/About";
import { ToastContainer } from "react-toastify";
import Favorites from "../Components/Favorites/Favorites";

function App() {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");

  const port = import.meta.env.VITE_PORT;
  const url = `http://localhost:${port}/movie/search/${search}`;

  const fetchData = async () => {
    setMovie([]);
    if (search) {
      const response = await fetch(url);
      const data = await response.json();
      setMovie(data);
    } else {
      setMovie([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <BrowserRouter>
      <div className="BIGWRAPPER">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search setSearch={setSearch} className="first" />
                {search && <Card movie={movie} className="second" />}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/favorites" element={<Favorites />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
