import { useState, useEffect } from "react";
import { Figure } from "./Card.styled";
import { toast } from "react-toastify";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

import defaultImage from "@/assets/IMG/No_IMG.png";
import loadingImage from "@/assets/IMG/second.gif";

import "./card.style.css";

function Card({ movie }) {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState({});

  const token = localStorage.getItem("user");
  const host = import.meta.env.VITE_HOST;
  const url = `${host}/user/favorite`;

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (Object.keys(movie).length === 0) {
      console.log("Empty movie object, aborting request...");
      return;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        movie,
      }),
    });

    const data = await response.json();
    if (data.message === "Movie added to favorites") {
      toast.success("Movie added to favorites");
      setIsFavorite(true);
    }
  };

  const handleRemoveFavorite = async (e) => {
    e.preventDefault();
    if (Object.keys(movie).length === 0) {
      console.log("Empty movie object, aborting request...");
      return;
    }

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        movie,
      }),
    });

    const data = await response.json();

    if (data.message === "Movie removed from favorites") {
      toast.success("Movie removed from favorites");
      setIsFavorite(false);
    }
  };

  const checkFavorite = async () => {
    if (movie.Error === "Movie not found!") {
      toast.error("Movie not found");
      return;
    }

    const response = await fetch(`${url}/${movie.imdbID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.message === "Movie is already in favorites") {
      setIsFavorite(true);
    } else if (data.message === "Movie is not in favorites") {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    if (token === null) {
      setUser(false);
    } else {
      setUser(true);
      checkFavorite();
    }
  }, [movie]);

  return (
    <>
      {movie.length === 0 ? (
        <div className="indexLoadingWrapper">
          <img
            src={loadingImage}
            alt="loading animation"
            className="beforeLoad"
          />
        </div>
      ) : movie && !movie.Error ? (
        <div className="cardWrapper">
          {user ? (
            <button
              className="card_icon"
              onClick={isFavorite ? handleRemoveFavorite : handleFavorite}
            >
              {isFavorite ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
            </button>
          ) : null}
          <Figure>
            <img className="cardL" src={posterSrc} alt={movie.Title} />
            <figcaption>
              <h3>Info</h3>
              <p>Year: {movie.Year}</p>
              <p>IMBd rating: {movie.imdbRating}</p>
              <p>Genre: {movie.Genre}</p>
            </figcaption>
          </Figure>
        </div>
      ) : null}
    </>
  );
}

export default Card;
