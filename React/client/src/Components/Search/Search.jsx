import React from "react";
import { useState } from "react";
import "../Style/Btn.css";

import { StyledForm, StyledInput, StyledLabel } from "./Search.styled";

function Search({ setSearch}) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputValue);
   
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit} >
        <StyledLabel htmlFor="search">Search for a movie</StyledLabel>
        <StyledInput
          type="text"
          placeholder="Search for a movie"
          value={inputValue}
          onChange={handleChange}
        />
        <button className="button-85" type="submit">
          Search
        </button>
      </StyledForm>
    </>
  );
}

export default Search;
