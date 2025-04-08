import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: auto;
    margin: 80px 0px 30px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const ContainerText = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const ClientesText1 = styled.div`
    color: #800000;
    font-size: 85px;
    font-weight: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 25px 20px 25px; 

    @media (max-width: 480px) {
        margin: 0 10px 25px 10px;
        font-size: 65px;
    }
`;

export const ClientesText = styled.div`
    font-size: 35px;
    color: #800000;
    font-weight: 500;
    display: flex;
    justify-content: center;

    @media (max-width: 480px) {
        font-size: 30px;
        font-weight: 400;
    }
`;

export const ContainerImages = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    gap: 20px; 
    margin: 30px 0px 50px 0px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const ContainerImage = styled.img`
    width: 45%; 
    max-width: 600px;  
    height: auto;
    object-fit: cover; 
    
    @media (max-width: 768px) {
        width: 90%;  
    }
`;
