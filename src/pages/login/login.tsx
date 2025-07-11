import React, { useEffect, useState } from "react";
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
  ErrorMessage,
  Spinner,
} from "./loginStyle";
import Voltar from "../../assets/menorQue.png";
import Jarro from "../../assets/login_jarro.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Clientes from "../../components/clientes/cliente";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login } from "../../store/reducers/auth";
import { toast, ToastContainer } from "react-toastify";

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });


  useEffect(() => {
    if (location.state?.toastMessage) {
      const { toastMessage, type = 'info' } = location.state;

      switch (type) {
        case 'error':
          toast.error(toastMessage);
          break;
          case 'warning':
          toast.warn(toastMessage);
          break;
          default:
          toast.warn(toastMessage);
      }
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(form))
      .unwrap()
      .then(() => {
        navigate("/"); 
      })
      .catch(() => { });
  };

  return (
    <div>
      <ToastContainer
        position="top-right" 
        autoClose={4000}    
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"       
        style={{ zIndex: 1000 }}
      />
      <Header />
      <Container>
        <ConteinerLoginText>
          <IconVoltar alt="" src={Voltar} onClick={() => navigate('/')} />
          <TextLogin>Login</TextLogin>
        </ConteinerLoginText>
        <ContainerLoginGeral>
          <ImageLogin alt="" src={Jarro} />
          <ContainerLogin>
            <Text1>Login</Text1>
            <Text2>Digite seus detalhes abaixo</Text2>

            <form onSubmit={handleSubmit}>
              <TextInput>Email</TextInput>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <InputLogin
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                required
              />

              <TextInput>Senha</TextInput>
              <InputLogin
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                required
              />

              <ContainerText3>
                <Text3>Ainda não fez cadastro?</Text3>
                <Text4 onClick={() => navigate('/cadastro')}>Acesse aqui</Text4>
              </ContainerText3>

              <ContainerButton>
                <ButtonEntrar type="submit" disabled={loading}>
                  {loading ? <Spinner /> : "Entrar"}
                </ButtonEntrar>
                <ButtonEsqueceuSenha onClick={() => navigate("/")}>
                  Esqueceu a senha?
                </ButtonEsqueceuSenha>
              </ContainerButton>
            </form>
          </ContainerLogin>
        </ContainerLoginGeral>
      </Container>
      <Clientes />
      <Footer />
    </div>
  );
};

export default Login;
