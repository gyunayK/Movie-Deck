import React, { useState, useEffect } from "react";
import { Figure, Notfound } from "./Style/Card.styled";
import defaultImage from "../assets/IMG/No_IMG.png";
import loadingImage from "../assets/IMG/second.gif";

function Card({ movie }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const handleImageLoad = () => {
      setLoading(false);
    };

    const imgEl = new Image();
    imgEl.addEventListener("load", handleImageLoad);
    imgEl.addEventListener("error", handleImageLoad);
    imgEl.src = movie.Poster;

    return () => {
      imgEl.removeEventListener("load", handleImageLoad);
      imgEl.removeEventListener("error", handleImageLoad);
    };
  }, [movie]);

  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;

  return (
    <>
      {loading ? (
        <img src={loadingImage} alt="loading animation" />
      ) : movie && movie.Title ? (
        <Figure >
          <h1>{movie.Title}</h1>
          <img
            className="cardL"
            src={posterSrc}
            alt={movie.Title}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
          <figcaption>
            <h3>Info</h3>
            <p>Year: {movie.Year}</p>
            <p>IMBd rating: {movie.imdbRating}</p>
            <p>Genre: {movie.Genre}</p>
          </figcaption>
        </Figure>
      ) : (
        <Notfound>Movie Not Found</Notfound>
      )}
    </>
  );
}

export default Card;
