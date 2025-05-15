import styled from "styled-components";

export const ExploreContainer = styled.div`
    width: 100%;
    height: 630px;
    background-color: #D4D4D4;
    padding-bottom: 30px;
    margin-top: 100px;

    @media (max-width: 768px) {
        margin-top: 210px;
    }
`;

export const ExploreContainerColuns = styled.div`
    display: grid;
    grid-template-columns: 60vh 1fr;
    height: auto;
`;

export const TextExploreContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: start;
    margin: 2vh 0 2vh 8vh;
    flex-direction: column;

    @media (max-width: 480px) {
        margin-left: 30px;
    }
`;

export const BarrosExplore = styled.img`
    width: 75%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: 2%;
    
    @media (max-width: 1350px) {
        width: 95%;
    } 
    
    @media (max-width: 1095px) {
        width: 125%;
    } 

    @media (max-width: 980px) {
        width: 145%;
    } 

    @media (max-width: 836px) {
        width: 165%;
    } 

    @media (max-width: 768px) {
        display: none;
    } 
`;

export const TextUm = styled.div`
    width: 35vh;
    height: auto;
    color: #B67B57;
    font-size: 40px;
    font-weight: 600;
    line-height: 1;
    margin-top: 80px;
`;

export const TextDois = styled.div`
    width: 45vh;
    height: auto;
    color: #000000;
    font-size: 22px;
    margin-top: 2vh;
`;

export const ButtonExplore = styled.button`
    cursor: pointer;
    margin-top: 2vh;
    background-color: #802600;
    color: #FFFFFF;
    font-size: 20px;
    width: 25vh;
    height: 6.5vh;
`;

export const ContainerMaisVendido = styled.div`
    width: 100%;
    height: 200px;
    margin: 120px 80px 120px 30px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    @media (max-width: 1200px) {
        display: none;
    }
`;

export const ContainerTextMaisVendido = styled.div`
    width: 15%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin: 80px 0px 80px 80px;
`;

export const ContainerText1 = styled.div`
    display: flex;
    height: 25px;
    flex-direction: row;
    justify-content: start;
    align-items: center;
`;

export const Text1 = styled.div`
    font-size: 140px;
    font-weight: lighter;
    margin-bottom: 30px;
`;

export const Text2 = styled.div`
    font-size: 24px;
    font-weight: 600;
`;

export const Text3 = styled.div`
    font-size: 44px;
    font-weight: 500;
    margin-bottom: 10px;
`;

export const Text4 = styled.div`
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 25px;
`;

export const Text5 = styled.div`
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    width: 165px;
    height: 65px;
    background-color: #800000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;


export const VoltarDestaques = styled.img`
    width: 25px;
    margin: 0px 100px;
`;

export const AvancarDestaques = styled.img`
    width: 25px;
    margin-left: 70px;
    margin-right: 100px;
`;

export const ContainerProdutosDestaque = styled.div`
    width: 185px;
    height: 230px;
    border: solid 1px #bdbebd;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    margin-bottom: 50px;
    margin-right: 20px;
    padding: 20px;
    cursor: pointer;

`;

export const ImageProdutoDestaque = styled.img`
    width: 190px;
    height: 190px;
    background-size: contain;
`;

export const ProdutoNameDestaque = styled.div`
    font-size: 17px;
    font-weight: 600;
`;

export const ProdutoValorDestaque = styled.div`
    font-size: 18px;
    font-weight: 400;
`;

export const ContainerImageAltaQualidade = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        margin-top: 20px;
    } 
`;

export const ImageAltaQualidade = styled.img`
    width: 90%;
    height: auto;
    background-size: contain;
`;

export const ContainerText = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 70px 0px;
`;

export const ProdutosText1 = styled.div`
    color: #800000;
    font-size: 85px;
    font-weight: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 25px 20px 25px; 
`;

export const ProdutosText = styled.div`
    font-size: 35px;
    color: #800000;
    font-weight: 500;
    display: flex;
    justify-content: center;
    
    @media (max-width: 510px) {
        font-size: 25px;
    }
`;

export const ContainerCategorias = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;

    @media (max-width: 768px) {
        flex-direction: column;
        padding-left: 35%;
    }

    @media (max-width: 560px) {
        flex-direction: column;
        padding-left: 30%;
    }

    @media (max-width: 420px) {
        flex-direction: column;
        padding-left: 23%;
    }
`;

export const CategoriaSelecionada = styled.div`
    width: 200px;
    height: 50px;
    background-color: #800000;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
    border: solid 2px #800000;
`;

export const CategoriaNaoSelecionada = styled.div`
    width: 200px;
    height: 50px;
    background-color: #fff;
    color: #800000;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 50px;
    border: solid 2px #800000;
`;


export const ContainerProdutosGeral1 = styled.div`
    width: auto;
    height: auto;
    margin: 2% 2%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LinhaUm = styled.div`
    width: 100%;
    height: 10px;
    background-color: #B67B57;
`;

export const LinhaDois = styled.div`
    width: 100%;
    height: 25px;
    background-color: #800000;
`;