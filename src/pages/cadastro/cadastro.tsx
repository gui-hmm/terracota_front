import React, { useState } from "react";
import {
  ButtonEntrar,
  Checkbox,
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
  ErrorMessage, // Importando a nova estilização para mensagens de erro
} from "./cadastroStyle";
import Voltar from "../../assets/menorQue.png";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Jarros from "../../assets/cadastro_barros.png";
import { To, useNavigate } from "react-router-dom";

function Cadastro() {
  const [role, setRole] = useState<string>("cliente");

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
    contact: "",
    termsAccepted: false,  // Estado para controlar o checkbox de termos
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cpf: "",
    contact: "",
    password: "",
    confirmPassword: "",
    termsAccepted: "",  // Erro para o checkbox de termos
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;

    // Se o tipo do campo for checkbox, usamos `checked`, caso contrário usamos `value`.
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement; // Afirmação de tipo para garantir que seja um HTMLInputElement
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,  // Aqui usamos `target.checked` para o checkbox
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,  // Para outros tipos de input, usamos `value`
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

  const validateContact = (contact: string): boolean => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(contact);
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

    // Validação para o campo "Nome"
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

    if (!validateContact(form.contact)) {
      newErrors.contact = "Contato inválido. Formato esperado: (XX) XXXXX-XXXX";
    } else {
      newErrors.contact = "";
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

    // Validação para o checkbox de "Aceitar os termos"
    if (!form.termsAccepted) {
      newErrors.termsAccepted = "Você precisa aceitar os termos e condições.";
    } else {
      newErrors.termsAccepted = "";
    }

    setErrors(newErrors);

    // Se existir algum erro, o formulário não será enviado
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    if (validateForm()) {
      alert("Formulário enviado com sucesso!");
    } else {
      alert("Existem erros no formulário.");
    }
  };

  return (
    <div>
      <Header />
      <Container>
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
            {errors.contact && <ErrorMessage>{errors.contact}</ErrorMessage>}
            <InputCadastro
              name="contact"
              value={form.contact}
              onChange={handleInputChange}
              required
            />

            <TextInput>Tipo de Usuário</TextInput>
            <SelectInput value={role} onChange={handleRoleChange}>
              <option value="cliente">Cliente</option>
              <option value="artesao">Artesão</option>
              <option value="empresa">Empresa</option>
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
              <ButtonEntrar onClick={handleSubmit}>Entrar</ButtonEntrar>
            </ContainerButton>
          </ContainerCadastro>
        </ContainerCadastroGeral>
      </Container>
      <Footer />
    </div>
  );
}

export default Cadastro;
