import styled, { keyframes } from "styled-components";

const huHuAnimation = keyframes`
  50% {
    transform: translateY(-5px);
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100px;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #fff;

    @media (max-width: 768px) {
        /* Para tablets */
        flex-direction: column;
        align-items: center;
        height: auto;
    }
`;

export const LogoIcon = styled.img`
    width: 35%;
    margin-right: 5px;
    margin-top: 2px;

    @media (min-width: 1268px) {
        width: 25%;
    }

    @media (max-width: 768px) {
        width: 60%;
    }
`;

export const IconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 800px;
    height: auto;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        padding-bottom: 10px;
    }
`;

export const IconsPages = styled.div`
    cursor: pointer;
    display: flex;
    color: #802600;
    font-size: larger;

    &:hover {
        color: #000000;
    }
`;

export const IconsRightContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: auto;
    height: auto;
    margin-right: 1vh;

    @media (max-width: 768px) {
        margin-left: 15%;
        padding-bottom: 10px;
    }
`;

export const ChatbotButton = styled.img`
    cursor: pointer;
    color: #000000;
    width: 30px;
    margin-right: 6vh;

    @media (max-width: 876px) {
        margin-right: 3vh;
    }
`;

export const CarrinhoButton = styled.img`
    cursor: pointer;
    width: 25px;
    height: 25px;
    margin-right: 6vh;
    transition: 0.2s;

    &:hover {
        animation: ${huHuAnimation} infinite 2s ease-in-out;
    }

    @media (max-width: 876px) {
        margin-right: 2vh;
    }

    @media (max-width: 768px) {
        margin-right: 6vh;
    }
`;

