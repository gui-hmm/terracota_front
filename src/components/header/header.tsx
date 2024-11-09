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

function Header() {
    return (
        <div>
            <Container>
                <LogoIcon
                    alt="" src={Logo}
                />
                <IconsContainer>
                    <IconsPages>Home</IconsPages>
                    <IconsPages>Quem Somos</IconsPages>
                    <IconsPages>Produtos</IconsPages>
                    <IconsPages>Contato</IconsPages>
                    <IconsPages>Login</IconsPages>
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