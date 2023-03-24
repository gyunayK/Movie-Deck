import React from "react";
import { StyledWrapper, StyledImg } from "./Style/Card.styled";

function Card({ movie }) {
  return (
    <>
      {
        (movie.Title = movie.Title ? (
          <StyledWrapper>
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
            <p>IMBd rating: {movie.imdbRating}</p>
            <StyledImg src={movie.Poster} alt={movie.Title} />
          </StyledWrapper>
        ) : (
          ""
        ))
      }
    </>
  );
}

export default Card;
