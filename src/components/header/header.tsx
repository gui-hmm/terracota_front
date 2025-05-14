import React, { useEffect, useState } from "react";
import Logo from '../../assets/logomarca.png';
import Carrinho from '../../assets/carrinho_icon.png';
import Robot from '../../assets/robot.png';
import Painel from '../../assets/painel.svg';
import { 
    CarrinhoButton,
    Container,
    IconsContainer,
    IconsPages,
    IconsRightContainer,
    LogoIcon,
    ChatbotButton,
    ConfiguracaoButton,
} from "./headerStyle";
import { To, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    sub: string;
    role: "CUSTOMER" | "CRAFTSMAN" | "COMPANY";
}

const Header = () => {
    const navigate = useNavigate();
    const token = useAppSelector(state => state.auth.token);
    const isLoggedIn = !!token;
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
          try {
            const decoded = jwtDecode<JwtPayload>(token);
            setUserRole(decoded.role);
          } catch (error) {
            console.error("Erro ao decodificar o token:", error);
          }
        }
      }, [token]);

    const handleNavigate = (path: To) => {
        navigate(path);
    };

    return (
        <Container>
            <LogoIcon alt="Logo" src={Logo} />
            <IconsContainer>
                <IconsPages onClick={() => handleNavigate('/')}>Início</IconsPages>
                <IconsPages onClick={() => handleNavigate('/quemsomos')}>Quem Somos</IconsPages>
                <IconsPages onClick={() => handleNavigate('/produtos')}>Produtos</IconsPages>
                
                <IconsPages onClick={() => handleNavigate(isLoggedIn ? '/perfil' : '/login')}>
                    {isLoggedIn ? 'Perfil' : 'Login'}
                </IconsPages>
            </IconsContainer>
            <IconsRightContainer>
                {userRole !== "CRAFTSMAN" && (
                    <CarrinhoButton title="Carrinho" src={Carrinho} alt="Carrinho" onClick={() => handleNavigate('/carrinho')} />
                )}

                {userRole === "CRAFTSMAN" && (
                    <>
                        <CarrinhoButton title="Carrinho" src={Carrinho} alt="Carrinho" onClick={() => handleNavigate('/carrinho')} />
                        <ConfiguracaoButton title="Painel do artesão" src={Painel} alt="Painel" onClick={() => handleNavigate('/meusprodutos')} />
                    </>
                )}

                <ChatbotButton title="chatbot" src={Robot} alt="Chat bot" onClick={() => handleNavigate('/chatbot')} />
            </IconsRightContainer>
        </Container>
    );
};

export default Header;
