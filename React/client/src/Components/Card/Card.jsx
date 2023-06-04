import React, { useState, useEffect } from "react";
import { Figure, Notfound } from "../Style/Card.styled";
import defaultImage from "@/assets/IMG/No_IMG.png";
import loadingImage from "@/assets/IMG/second.gif";

function Card({ movie }) {
  const posterSrc = movie.Poster !== "N/A" ? movie.Poster : defaultImage;

  return (
    <>
      {movie.length === 0 ? (
        <Figure>
          <img src={loadingImage} alt="loading animation" id="beforeLoad" />
        </Figure>
      ) : movie && movie.Title ? (
        <Figure>
          <img className="cardL" src={posterSrc} alt={movie.Title} />
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
