import styled from "styled-components";

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
    width: auto;
    margin-right: 5px;
    margin-top: 2px;

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
        /* Para tablets */
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

export const SearchButton = styled.img`
    cursor: pointer;
    color: #000000;
    width: 25px;
    height: 25px;
    margin-right: 6vh;
`;

export const CarrinhoButton = styled.img`
    cursor: pointer;
    color: #000000;
    width: 25px;
    height: 25px;
    margin-right: 6vh;
    transition: 0.2s;

    &:hover {
        width: 30px;
        height: 30px;
    }
`;

