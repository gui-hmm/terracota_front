import React, { useEffect, useState } from "react";
import Logo from '../../assets/logomarca.png';
import Carrinho from '../../assets/carrinho_icon.png';
import Robot from '../../assets/robot.png';
import Painel from '../../assets/painel.svg';
import Menu from '../../assets/menu.svg';
import {
    CarrinhoButton,
    Container,
    IconsContainer,
    IconsPages,
    IconsRightContainer,
    LogoIcon,
    ChatbotButton,
    ConfiguracaoButton,
    MenuButton,
    ContainerLogoMenu,
    MenuContent // novo componente
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
    const [menuOpen, setMenuOpen] = useState(false); // estado para controlar visibilidade do menu

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
        setMenuOpen(false); // Fecha o menu ao navegar
    };

    return (
        <Container>
            <ContainerLogoMenu>
                <LogoIcon alt="Logo" src={Logo} />
                <MenuButton 
                    title="Abrir Menu"
                    src={Menu}
                    alt="Menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </ContainerLogoMenu>

            <MenuContent $menuOpen={menuOpen}>
                <div ></div>
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
            </MenuContent>
        </Container>
    );
};

export default Header;
