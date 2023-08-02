import styled from "styled-components";

const BaseDuration = "500ms";

export const Figure = styled.figure`
  position: relative;
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  width: 270px;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all ${BaseDuration} cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  margin: 0 auto;
  aspect-ratio: 5/8.5;

  @media screen and (max-width: 500px) {
    width: clamp(250px, 100%, 400px);
    margin-bottom: 1rem;
  }

  .card_icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 45px;
    z-index: 100;
    cursor: pointer;
    color: #e4163a;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

    h1 {
      opacity: 0;
      transform: scale(0.7);
    }

    img {
      transform: scale(1.25);
    }

    figcaption {
      bottom: -30px;
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: 0.25s; 
  }

  figcaption {
    position: absolute;
    bottom: -50%;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.85);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    color: white;
    line-height: 1;
    transition: 0.25s;

    @media screen and (max-width: 500px) {
      bottom: -60%;
    }

    h3 {
      margin: 0 0 20px;
      padding: 0;
    }

    p {
      font-size: 14px;
      line-height: 1.75;
    }
  }
`;

export const Notfound = styled.h1`
  font-size: 2rem;
  color: #fff;
  text-align: center;
  margin-top: 2rem;
  margin: 0 auto;
`;
