import React, { useState, useEffect } from "react";
import { Figure, Notfound } from "./Card.styled";
import defaultImage from "@/assets/IMG/No_IMG.png";
import loadingImage from "@/assets/IMG/second.gif";
import { toast } from "react-toastify";

import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

function Card({ movie }) {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;
  const [isFavorite, setIsFavorite] = useState(false);

  const token = localStorage.getItem("user");

  const port = import.meta.env.VITE_PORT;
  const url = `http://localhost:${port}/user/favorite`;

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
    console.log(data);
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
    console.log(data);

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
    console.log(data);

    if (data.message === "Movie is already in favorites") {
      setIsFavorite(true);
    } else if (data.message === "Movie is not in favorites") {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, [movie]);

  // rest of your component
  return (
    <>
      {movie.length === 0 ? (
        <Figure>
          <img src={loadingImage} alt="loading animation" id="beforeLoad" />
        </Figure>
      ) : movie && !movie.Error ? (
        <Figure>
          {isFavorite ? (
            <button onClick={handleRemoveFavorite}>
              <MdOutlineFavorite className="card_icon" />
            </button>
          ) : (
            <button onClick={handleFavorite}>
              <MdOutlineFavoriteBorder className="card_icon" />
            </button>
          )}

          <img className="cardL" src={posterSrc} alt={movie.Title} />
          <figcaption>
            <h3>Info</h3>
            <p>Year: {movie.Year}</p>
            <p>IMBd rating: {movie.imdbRating}</p>
            <p>Genre: {movie.Genre}</p>
          </figcaption>
        </Figure>
      ) : (
        ""
      )}
    </>
  );
}

export default Card;
