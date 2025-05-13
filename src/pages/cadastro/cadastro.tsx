import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register } from "../../store/reducers/auth";
import {
  ButtonEntrar,
  Container,
  ContainerButton,
  ContainerCadastro,
  ContainerCadastroGeral,
  ContainerText2,
  ConteinerCadastroText,
  IconVoltar,
  ImageCadastro,
  InputCadastro,
  Text1,
  Text2,
  TextCadastro,
  TextInput,
  SelectInput,
  ErrorMessage,
  Spinner,
} from "./cadastroStyle";
import Voltar from "../../assets/menorQue.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Jarros from "../../assets/cadastro_barros.png";
import { To, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

function Cadastro() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: authError } = useSelector((state: RootState) => state.auth);

  const [role, setRole] = useState<string>("CUSTOMER");

  const navigate = useNavigate();

  const handleNavigate = (path: To) => {
    navigate(path);
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
    phone: "",
    termsAccepted: false, 
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "", 
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,  
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value, 
      }));
    }
  };
  
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setRole(event.target.value);
  };

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validateCPF = (cpf: string): boolean => {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
  };

  const validatePhone = (phone: string): boolean => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
    return password === confirmPassword;
  };

  const validateForm = (): boolean => {
    let newErrors: any = { ...errors };

    if (!form.name.trim()) {
      newErrors.name = "O campo 'Nome' é obrigatório.";
    } else {
      newErrors.name = "";
    }

    if (!validateEmail(form.email)) {
      newErrors.email = "Email inválido";
    } else {
      newErrors.email = "";
    }

    if (!validateCPF(form.cpf)) {
      newErrors.cpf = "CPF inválido. Formato esperado: XXX.XXX.XXX-XX";
    } else {
      newErrors.cpf = "";
    }

    if (!validatePhone(form.phone)) {
      newErrors.phone = "Contato inválido. Formato esperado: (XX) XXXXX-XXXX";
    } else {
      newErrors.phone = "";
    }

    if (!validatePassword(form.password)) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres";
    } else {
      newErrors.password = "";
    }

    if (!validateConfirmPassword(form.password, form.confirmPassword)) {
      newErrors.confirmPassword = "As senhas não coincidem";
    } else {
      newErrors.confirmPassword = "";
    }

    if (!form.termsAccepted) {
      newErrors.termsAccepted = "Você precisa aceitar os termos e condições.";
    } else {
      newErrors.termsAccepted = "";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await dispatch(register({
          email: form.email,
          password: form.password,
          name: form.name,
          cpf: form.cpf.replace(/[.-]/g, ''), 
          phone: form.phone.replace(/[()-\s]/g, ''),
          role: role.toUpperCase(),
        })).unwrap();

        if (result) {
          handleNavigate('/login'); 
        }
      } catch (error) {
        const err = error as AxiosError;
      
        console.error('Registration failed:', {
          message: err.response?.data,
          status: err.response?.status,
          fullError: err,
        });
      }
    }
  };

  return (
    <div>
      <Header />
      <Container>
      {authError && <ErrorMessage>{authError}</ErrorMessage>}
        <ConteinerCadastroText>
          <IconVoltar alt="" src={Voltar} onClick={() => handleNavigate('/')} />
          <TextCadastro>Cadastro</TextCadastro>
        </ConteinerCadastroText>
        <ContainerCadastroGeral>
          <ImageCadastro alt="" src={Jarros} />
          <ContainerCadastro>
            <Text1>Cadastro</Text1>

            <TextInput>Nome</TextInput>
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            <InputCadastro
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />

            <TextInput>Email</TextInput>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <InputCadastro
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
            />

            <TextInput>Senha</TextInput>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <InputCadastro
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
            />

            <TextInput>Confirmar Senha</TextInput>
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
            <InputCadastro
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleInputChange}
              required
            />

            <TextInput>CPF</TextInput>
            {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
            <InputCadastro
              name="cpf"
              value={form.cpf}
              onChange={handleInputChange}
              required
            />

            <TextInput>Contato</TextInput>
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            <InputCadastro
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              required
            />

            <TextInput>Tipo de Usuário</TextInput>
            <SelectInput value={role} onChange={handleRoleChange}>
              <option value="CUSTOMER">Cliente</option>
              <option value="CRAFTSMAN">Artesão</option>
              <option value="COMPANY">Empresa</option>
            </SelectInput>

                {errors.termsAccepted && (
                    <ErrorMessage>{errors.termsAccepted}</ErrorMessage>
                )}
            <ContainerText2>
                <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={form.termsAccepted}
                    onChange={handleInputChange}
                    required
                    style={{ marginTop: '6px' }}
                />
                <Text2>Aceitar os termos e condições</Text2>
            </ContainerText2>

            <ContainerButton>
              <ButtonEntrar
                onClick={handleSubmit}
                disabled={loading}
                type="button"
              >
                {loading ? <Spinner /> : "Entrar"}
              </ButtonEntrar>
            </ContainerButton>
          </ContainerCadastro>
        </ContainerCadastroGeral>
      </Container>
      <Footer />
    </div>
  );
}

export default Cadastro;
