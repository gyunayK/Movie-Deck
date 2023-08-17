import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "../Components/Card/Card";
import Search from "../Components/Search/Search";
import Header from "../Components/Header/Header";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import About from "../Components/About/About";
import Favorites from "../Components/Favorites/Favorites";
import loadingImage from "@/assets/IMG/second.gif";

function App() {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const host = import.meta.env.VITE_HOST;
  const url = `${host}/movie/search/${search}`;

  const fetchData = async () => {
    setMovie([]);
    if (search) {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    } else {
      setMovie([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <BrowserRouter>
      <div className="appWrapper">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search setSearch={setSearch} />
                <div>
                  {loading ? (
                    <div className="indexLoadingWrapper">
                      <img
                        src={loadingImage}
                        alt="loading animation"
                        className="beforeLoad"
                      />
                    </div>
                  ) : search && movie?.length > 0 ? (
                    <div className="grid xs:max-w-xs sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:max-w-screen-2xl mx-auto">
                      {movie.map((movieItem) => (
                        <Card key={movieItem.id} movie={movieItem} />
                      ))}
                    </div>
                  ) : search && movie?.length === 0 ? (
                    <div className="max-w-3xl mx-auto">
                      <h1 className=" text-xl md:text-6xl text-center text-white mt-10">
                        No movies found
                      </h1>
                    </div>
                  ) : null}
                </div>
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
