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
`;

export const ClientesText = styled.div`
    font-size: 35px;
    color: #800000;
    font-weight: 500;
    display: flex;
    justify-content: center;
`;

export const ContainerImages = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    gap: 20px;  /* Adicionando um pequeno espaço entre as imagens */
    margin: 30px 0px 50px 0px;

    @media (max-width: 768px) {
        flex-direction: column;  /* Em telas menores, as imagens serão empilhadas */
        align-items: center;
    }
`;

export const ContainerImage = styled.img`
    width: 45%;  /* Faz com que as imagens ocupem 45% da largura disponível */
    max-width: 600px;  /* Garantindo que a largura máxima da imagem não ultrapasse 600px */
    height: auto;  /* Mantém a proporção da imagem */
    object-fit: cover;  /* Faz com que a imagem cubra o espaço sem distorcer */
    
    @media (max-width: 768px) {
        width: 90%;  /* Em telas menores, as imagens ocupam mais espaço (90%) */
    }
`;
