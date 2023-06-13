import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: rgb(255 255 255 / 29%);
  border-radius: 10rem;
  margin-top: 2rem;
  height: 100%;
  width: 400px;

  @media screen and (max-width: 500px) {
    max-width: clamp(250px, 90%, 400px);
    padding: 20px 5px;
  }
`;

export const StyledLabel = styled.label`
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
`;

export const StyledInput = styled.input`
  width: 65%;
  padding: 0.6rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.8rem;
  background-color: white;
  font-size: 1rem;
  color: black;
  @media screen and (max-width: 375px) {
    width: 65%;
  }
`;
