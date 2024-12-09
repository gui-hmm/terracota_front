import React from "react";
import Logo from '../../assets/logomarca.png'
import Search from '../../assets/search_icon.webp'
import Carrinho from '../../assets/carrinho_icon.png'
import { 
    Container,
    IconsContainer,
    IconsPages,
    IconsRightContainer,
    LogoIcon,
    SearchCarrinhoButton} from "./headerStyle";
import { useContext, useState } from "react";
import { To, useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    // Função para navegação
    const handleNavigate = (path: To) => {
        navigate(path);
    };

    return (
        <div>
            <Container>
                <LogoIcon
                    alt="" src={Logo}
                />
                <IconsContainer>
                    <IconsPages onClick={() => handleNavigate('/')}>Home</IconsPages>
                    <IconsPages onClick={() => handleNavigate('/quemsomos')}>Quem Somos</IconsPages>
                    <IconsPages onClick={() => handleNavigate('/produtos')}>Produtos</IconsPages>
                    <IconsPages onClick={() => handleNavigate('/')}>Contato</IconsPages>
                    <IconsPages onClick={() => handleNavigate('/login')}>Login</IconsPages>
                </IconsContainer>
                <IconsRightContainer>
                    <SearchCarrinhoButton src={Search} alt="" />
                    <SearchCarrinhoButton src={Carrinho} alt="" />
                </IconsRightContainer>
            </Container>
        </div>
    )
}

export default Header;