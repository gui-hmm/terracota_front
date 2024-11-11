import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: auto;
    margin: 150px 25px 50px 25px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
`;

export const ContainerProdutosGeral = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
    column-gap: 20px;
    row-gap: 50px;
    position: relative;
    width: 100%;
    height: auto;
    margin-bottom: 50px;
`;

export const ContainerProdutos = styled.div`
    width: 285px;
    height: 350px;
    border: solid 1px #bdbebd;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 20px;
    cursor: pointer;

`;

export const ImageProduto = styled.img`
    width: 300px;
    height: 300px;
    background-size: contain;
`;

export const ProdutoName = styled.div`
    font-size: 17px;
    font-weight: 600;
`;

export const ProdutoValor = styled.div`
    font-size: 18px;
    font-weight: 400;
`;