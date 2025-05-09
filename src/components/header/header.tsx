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
} from "./headerStyle";
import { To, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

// Suponha que você tenha um contexto de autenticação que armazena o estado de login do usuário
// Por exemplo, useAuthContext() seria um hook que retornaria se o usuário está logado ou não.
const Header = () => {

    const navigate = useNavigate();
    const token = useAppSelector(state => state.auth.token);
    const isLoggedIn = !!token;

    // Função para navegação
    const handleNavigate = (path: To) => {
        navigate(path);
    };

    return (
        <Container>
            <LogoIcon alt="Logo" src={Logo} />
            <IconsContainer>
                <IconsPages onClick={() => handleNavigate('/')}>Home</IconsPages>
                <IconsPages onClick={() => handleNavigate('/quemsomos')}>Quem Somos</IconsPages>
                <IconsPages onClick={() => handleNavigate('/produtos')}>Produtos</IconsPages>
                
                <IconsPages onClick={() => handleNavigate(isLoggedIn ? '/perfil' : '/login')}>
                    {isLoggedIn ? 'Perfil' : 'Login'}
                </IconsPages>
            </IconsContainer>
            <IconsRightContainer>
                <CarrinhoButton src={Carrinho} alt="Carrinho" onClick={() => handleNavigate('/carrinho')} />
                <ChatbotButton src={Robot} alt="Chat bot" onClick={() => handleNavigate('/chatbot')} />
            </IconsRightContainer>
        </Container>
    );
};

export default Header;
