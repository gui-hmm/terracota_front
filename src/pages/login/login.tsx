import React, { useState } from "react";
import {
  ButtonEntrar,
  ButtonEsqueceuSenha,
  Container,
  ContainerButton,
  ContainerLogin,
  ContainerLoginGeral,
  ContainerText3,
  ConteinerLoginText,
  IconVoltar,
  ImageLogin,
  InputLogin,
  Text1,
  Text2,
  Text3,
  Text4,
  TextInput,
  TextLogin,
  ErrorMessage, // Importando a estilização para mensagens de erro
} from "./loginStyle";
import Voltar from "../../assets/menorQue.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Clientes from "../../components/clientes/cliente";
import Jarro from "../../assets/login_jarro.png";
import { To, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };
  
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateForm = (): boolean => {
    let newErrors = { ...errors };

    if (!validateEmail(form.email)) {
      newErrors.email = "Email inválido.";
    } else {
      newErrors.email = "";
    }

    if (!validatePassword(form.password)) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres.";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (validateForm()) {
      alert("Login bem-sucedido!");
      // Aqui você pode adicionar a lógica para autenticação real.
    } else {
      alert("Existem erros no formulário.");
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <ConteinerLoginText>
          <IconVoltar alt="" src={Voltar} onClick={() => handleNavigate('/')} />
          <TextLogin>Login</TextLogin>
        </ConteinerLoginText>
        <ContainerLoginGeral>
          <ImageLogin alt="" src={Jarro} />
          <ContainerLogin>
            <Text1>Login</Text1>
            <Text2>Digite seus detalhes abaixo</Text2>

            <TextInput>Email</TextInput>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <InputLogin
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />

            <TextInput>Senha</TextInput>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <InputLogin
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
            />

            <ContainerText3>
              <Text3>Ainda não fez cadastro?</Text3>
              <Text4 onClick={() => handleNavigate('/cadastro')}>Acesse aqui</Text4>
            </ContainerText3>

            <ContainerButton>
              <ButtonEntrar onClick={handleSubmit}>Entrar</ButtonEntrar>
              <ButtonEsqueceuSenha onClick={() => handleNavigate("/esqueci-senha")}>
                Esqueceu a senha?
              </ButtonEsqueceuSenha>
            </ContainerButton>
          </ContainerLogin>
        </ContainerLoginGeral>
      </Container>
      <Clientes />
      <Footer />
    </div>
  );
}

export default Login;
