import styled from "styled-components";

export const ContainerFooter = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    background-color: #800000;
    position: relative;
    bottom: 0;
    left: 0;

    @media (max-width: 768px){
        height: auto;
    }
`;

export const InformationContainer =  styled.div`
    width: 100%;
    height: 70%;
    display: grid;
    grid-template-columns: 1.5fr 2fr 1fr;
    margin: 40px 100px 5px 100px;

    @media (max-width: 768px){
        display: flex;
        flex-direction: column;
    }
`;

export const EmailContainer = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: 300;
`;

export const BemvindoContainerText = styled.div`
    width: 65%;
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;

`;

export const BemvindoText = styled.div`
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
`;

export const SobreText = styled.div`
    color: #fff;
    font-size: 16px;
    font-weight: 520;
`;

export const IconsSocialMidiaContainer = styled.div`
    width: 20%;
    height: 35px;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
`;

export const IconsSocialMidia = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const IconsImage = styled.img`
    width: 20px;
    height: auto;
    cursor: pointer;
`;

export const InscrevaseContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;

`;

export const InscrevaseText = styled.div`
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    margin-left: 5px;
    margin-bottom: 10px;
`;

export const EmailInput = styled.input`
    width: 60%;
    height: 50px;
    border-radius: 10px;
    background-color: #fff;
    color: #000;

    &::placeholder{
        padding-left: 20px;
    }
`;

export const PagesContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: column;
`;

export const Page = styled.div`
    color: #fff;
    font-weight: 300;
    padding: 3px;
    cursor: pointer;
`;
