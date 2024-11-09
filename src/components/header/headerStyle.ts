import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100px;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #fff;
`;

export const LogoIcon = styled.img`
    width: auto;
    margin-right: 5px;
    margin-top: 2px;
`;

export const IconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 800px;
    height: auto;
`;

export const IconsPages = styled.div`
    cursor: pointer;
    display: flex;
    color: #B67B57;
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
`;

export const SearchCarrinhoButton = styled.img`
    cursor: pointer;
    color: #000000;
    width: 25px;
    height: 25px;
    margin-right: 6vh;

    &:hover {
        width: 30px;
        height: 30px;
    }
`;

