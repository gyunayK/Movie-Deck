import React, { useState, useEffect } from "react";
import { Figure, Notfound } from "./Card.styled";
import defaultImage from "@/assets/IMG/No_IMG.png";
import loadingImage from "@/assets/IMG/second.gif";
import { toast } from "react-toastify";

import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

function Card({ movie, handleRemoveFavorite }) {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;
  const [isFavorite, setIsFavorite] = useState(true);

  const token = localStorage.getItem("user");

  const port = import.meta.env.VITE_PORT;
  const url = `http://localhost:${port}/user/favorite`;

  // const handleRemoveFavorite = async (e) => {
  //   e.preventDefault();
  //   if (Object.keys(movie).length === 0) {
  //     console.log("Empty movie object, aborting request...");
  //     return;
  //   }

  //   const response = await fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token,
  //       movie,
  //     }),
  //   });

  //   const data = await response.json();
  //   console.log(data);

  //   if (data.message === "Movie removed from favorites") {
  //     toast.success("Movie removed from favorites");
  //     setIsFavorite(false);
  //   }
  // };

  return (
    <>
      {movie.length === 0 ? (
        <Figure>
          <img src={loadingImage} alt="loading animation" id="beforeLoad" />
        </Figure>
      ) : movie && movie.Title ? (
        <div className="cardFavWrapper">
            {isFavorite ? (
              <button  className="card_icon" onClick={() => handleRemoveFavorite(movie)}>
                <MdOutlineFavorite />
              </button>
            ) : (
              <button>
                <MdOutlineFavoriteBorder className="card_icon" />
              </button>
            )}
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
      ) : (
        <Notfound>Movie Not Found</Notfound>
      )}
    </>
  );
}

export default Card;
