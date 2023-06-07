import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  padding: 1rem;
  background-color: #1c0a3e6a;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  height: 200px;
  max-width: 400px;
  
  @media screen and (max-width: 375px) {
   padding-bottom: 30px;
   margin: 10px;
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
    width: 90%;
  }
`;


