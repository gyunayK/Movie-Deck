import React from 'react'


import { StyledForm } from './Style/Search.styled'

const handleSubmit = (e) => {
    e.preventDefault()
}

function Search() {
  return (
    <>
    <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="search">Search for a movie</label> <br />
        <input type="text" placeholder="Search for a movie" />  <br />
        <button type="submit">Search</button>

    </StyledForm>
    </>
  )
}

export default Search