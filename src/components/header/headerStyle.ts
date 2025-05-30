import styled, { keyframes } from "styled-components";

interface MenuContentProps {
  $menuOpen: boolean;
}

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
    z-index: 100;
    background-color: #fff;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        height: auto;
    }
`;

export const ContainerLogoMenu = styled.div`
    display: flex;
    justify-content: start;
    
    @media (max-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const LogoIcon = styled.img`
    width: 100%;
    margin-right: 5px;
    margin-top: 2px;

    @media (max-width: 768px) {
        width: 60%;
    }
`;

export const MenuButton = styled.img`
    display: none;
    
    @media (max-width: 768px) {
        display: flex;
        width: 25px;

        margin-right: 3vh;
    }
`;

export const MenuContent = styled.div<MenuContentProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        display: ${({ $menuOpen }) => ($menuOpen ? 'flex' : 'none')};
        width: 100%;
    }
`;

export const IconsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 65%;
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
        margin-left: 6%;
        padding-bottom: 10px;
    }

    @media (max-width: 400px) {
        margin-left: 9%;
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

export const ConfiguracaoButton = styled.img`
    cursor: pointer;
    width: 28px;
    height: 28px;
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
