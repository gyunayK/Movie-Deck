import React from 'react'
import { StyledWrapper } from './Style/Card.styled'

function Card( { movie }) {
  return (
    <StyledWrapper>
        <h1>{movie.Title}</h1>
        <p>{movie.Year}</p>
        <img src={movie.Poster} alt={movie.Title} />
    </StyledWrapper>
  )
}

export default Card