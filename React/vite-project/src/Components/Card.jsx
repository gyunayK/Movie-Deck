import React from 'react'
import { StyledWrapper, StyledImg } from './Style/Card.styled'

function Card( { movie }) {
  return (
    <StyledWrapper>
        <h1>{movie.Title}</h1>
        <p>{movie.Year}</p>
        <p>IMDb Rating {movie.imdbRating}</p>
        <StyledImg src={movie.Poster} alt={movie.Title} />
        
    </StyledWrapper>
  )
}

export default Card