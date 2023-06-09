import { useState } from "react";
import { StyledForm, StyledInput, StyledLabel } from "./Search.styled";
import "../Style/Btn.css";

function Search({ setSearch }) {
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
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="search">Discover a movie</StyledLabel>
        <StyledInput
          type="text"
          placeholder="Enter a movie title"
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
