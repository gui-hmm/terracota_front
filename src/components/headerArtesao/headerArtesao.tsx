import React, { useContext, useState } from "react";
import Logo from '../../assets/logomarca.png';
import Carrinho from '../../assets/carrinho_icon.png';
import Robot from '../../assets/robot.png';
import { 
    CarrinhoButton,
    Container,
    IconsContainer,
    IconsPages,
    IconsRightContainer,
    LogoIcon,
    ChatbotButton,
} from "./headerArtesaoStyle";
import { To, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Header = () => {
    const navigate = useNavigate();
    // const token = useAppSelector(state => state.auth.token);
    // const isLoggedIn = !!token;

    const handleNavigate = (path: To) => {
        navigate(path);
    };

    return (
        <Container>
            <LogoIcon alt="Logo" src={Logo} />
            <IconsContainer>
                <IconsPages onClick={() => handleNavigate('/meusprodutos')}>Meus Produtos</IconsPages>
                <IconsPages onClick={() => handleNavigate('/minhasvendas')}>Minhas vendas</IconsPages>
                <IconsPages onClick={() => handleNavigate('/dashboard')}>Painel de controle</IconsPages>
                <IconsPages onClick={() => handleNavigate('/perfil')}>Perfil</IconsPages>

            </IconsContainer>
            <IconsRightContainer>
                <ChatbotButton src={Robot} alt="Chat bot" onClick={() => handleNavigate('/chatbot')} />
            </IconsRightContainer>
        </Container>
    );
};

export default Header;
