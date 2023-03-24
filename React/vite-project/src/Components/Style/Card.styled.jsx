import styled from 'styled-components';

const BaseDuration = '500ms';

// Colors
const Color1 = '#2c3e50';
const Color2 = '#1abc9c';
const Color3 = '#2ecc71';

// Breakpoints
const Sm = 'new-breakpoint(min-width 320px)';
const Med = 'new-breakpoint(min-width 768px)';
const Lg = 'new-breakpoint(min-width 1024px)';

export const Figure = styled.figure`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 375px;
  min-width: 375px;
  height: 600px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all ${BaseDuration} cubic-bezier(.25,.8,.25,1);
  overflow: hidden;
  margin: 0 auto;
  
  
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    
    h1 {
      opacity: 0;
      transform: scale(0.7);
    }
    
    img {
      transform: scale(1.25);
    }
    
    figcaption {
      bottom: 0;
    }
  }
  
  h1 {
    position: absolute;
    top: 50px;
    left: 20px;
    margin: 0;
    padding: 0;
    color: white;
    fontWeight: bold;
    font-size: 60px;
    font-weight: 200;
    line-height: 1;
    opacity: 1;
    transform: scale(1);
    transition: 0.25s ease;
    z-index: 999;
  }
  
  img {
    height: 100%;
    transition: 0.25s;
  }
  
  figcaption {
    position: absolute;
    bottom: -34%;
    left: 0;
    width: 100%;
    margin: 0;
    padding: 30px;
    background-color: rgba(0, 0, 0, 0.85);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    color: white;
    line-height: 1;
    transition: 0.25s;
    
    h3 {
      margin: 0 0 20px;
      padding: 0;
    }
    
    p {
      font-size: 14px;
      line-height: 1.75;
    }
    
    button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0 0;
      padding: 10px 30px;
      background-color: ${Color2};
      border: none;
      border-radius: 5px;
      color: white;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;