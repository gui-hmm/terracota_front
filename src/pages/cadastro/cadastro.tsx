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
import { toast } from "react-toastify";

interface RegisterCredentials {
  email: string;
  password: string;
  phone: string;
  role: string;
  // Campos para Pessoa Física
  name?: string;
  cpf?: string;
  // Campos para Empresa
  legal_name?: string;
  trade_name?: string;
  cnpj?: string;
}

function Cadastro() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: authError } = useSelector((state: RootState) => state.auth);

  const [role, setRole] = useState<string>("CUSTOMER");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Campos comuns
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    termsAccepted: false,
    // Campos de Pessoa Física
    name: "",
    cpf: "",
    // Campos de Empresa
    legal_name: "",
    trade_name: "",
    cnpj: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    termsAccepted: "",
    name: "",
    cpf: "",
    legal_name: "",
    trade_name: "",
    cnpj: "",
  });
  
  const handleNavigate = (path: To) => {
    navigate(path);
  };
   const formatPhone = (value: string) => {
    const phone = value.replace(/\D/g, "").slice(0, 11); 
    return phone
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const formatCPF = (value: string) => {
    const cpf = value.replace(/\D/g, "").slice(0, 11);
    return cpf.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatCNPJ = (value: string) => {
    const cnpj = value.replace(/\D/g, "").slice(0, 14);
    if (cnpj.length <= 2) return cnpj;
    if (cnpj.length <= 5) return cnpj.replace(/(\d{2})(\d)/, '$1.$2');
    if (cnpj.length <= 8) return cnpj.replace(/(\d{2})(\d{3})(\d)/, '$1.$2.$3');
    if (cnpj.length <= 12) return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d)/, '$1.$2.$3/$4');
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d)/, '$1.$2.$3/$4-$5');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      let formattedValue = value;
      if (name === "cpf") formattedValue = formatCPF(value);
      if (name === "cnpj") formattedValue = formatCNPJ(value);
      if (name === "phone") formattedValue = formatPhone(value);
      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setRole(event.target.value);
    setErrors({} as any);
    setForm(prev => ({
        ...prev,
        name: "", cpf: "", legal_name: "", trade_name: "", cnpj: ""
    }));
  };
  
  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string): boolean => /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);
  const validateCPF = (cpf: string): boolean => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  const validateCNPJ = (cnpj: string): boolean => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(cnpj);
  const validatePassword = (password: string): boolean => password.length >= 8;

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {} as any;

    if (!validateEmail(form.email)) newErrors.email = "Email inválido";
    if (!validatePhone(form.phone)) newErrors.phone = "Contato inválido: (XX) XXXXX-XXXX";
    if (!validatePassword(form.password)) newErrors.password = "A senha deve ter no mínimo 8 caracteres";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "As senhas não coincidem";
    if (!form.termsAccepted) newErrors.termsAccepted = "Você precisa aceitar os termos e condições.";

    if (role === 'COMPANY') {
      if (!form.legal_name.trim()) newErrors.legal_name = "O campo 'Razão Social' é obrigatório.";
      if (!form.trade_name.trim()) newErrors.trade_name = "O campo 'Nome Fantasia' é obrigatório.";
      if (!validateCNPJ(form.cnpj)) newErrors.cnpj = "CNPJ inválido: XX.XXX.XXX/XXXX-XX";
    } else { 
      if (!form.name.trim()) newErrors.name = "O campo 'Nome' é obrigatório.";
      if (!validateCPF(form.cpf)) newErrors.cpf = "CPF inválido: XXX.XXX.XXX-XX";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        let credentials: RegisterCredentials;
        if (role === 'COMPANY') {
            credentials = {
                role: role,
                email: form.email,
                password: form.password,
                phone: form.phone.replace(/[()-\s]/g, ''),
                legal_name: form.legal_name,
                trade_name: form.trade_name,
                cnpj: form.cnpj.replace(/[./-]/g, ''),
            };
        } else {
            credentials = {
                role: role,
                email: form.email,
                password: form.password,
                phone: form.phone.replace(/[()-\s]/g, ''),
                name: form.name,
                cpf: form.cpf.replace(/[.-]/g, ''),
            };
        }
        
        try {
            await dispatch(register(credentials)).unwrap();
            toast.success("Cadastro realizado com sucesso! Faça o login.");
            handleNavigate('/login');
        } catch (error) {
            toast.error(error as string || "Ocorreu um erro no cadastro.");
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
            <Text1>Crie sua conta</Text1>

            <TextInput>Eu sou</TextInput>
            <SelectInput value={role} onChange={handleRoleChange}>
              <option value="CUSTOMER">Cliente</option>
              <option value="CRAFTSMAN">Artesão</option>
              <option value="COMPANY">Empresa</option>
            </SelectInput>

            {role === 'COMPANY' ? (
              <>
                <TextInput>Razão Social</TextInput>
                {errors.legal_name && <ErrorMessage>{errors.legal_name}</ErrorMessage>}
                <InputCadastro name="legal_name" value={form.legal_name} onChange={handleInputChange} required />

                <TextInput>Nome Fantasia</TextInput>
                {errors.trade_name && <ErrorMessage>{errors.trade_name}</ErrorMessage>}
                <InputCadastro name="trade_name" value={form.trade_name} onChange={handleInputChange} required />

                <TextInput>CNPJ</TextInput>
                {errors.cnpj && <ErrorMessage>{errors.cnpj}</ErrorMessage>}
                <InputCadastro name="cnpj" value={form.cnpj} onChange={handleInputChange} required />
              </>
            ) : (
              <>
                <TextInput>Nome Completo</TextInput>
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                <InputCadastro name="name" value={form.name} onChange={handleInputChange} required />

                <TextInput>CPF</TextInput>
                {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
                <InputCadastro name="cpf" value={form.cpf} onChange={handleInputChange} required />
              </>
            )}

            <TextInput>Email</TextInput>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <InputCadastro name="email" value={form.email} onChange={handleInputChange} required />
            
            <TextInput>Senha</TextInput>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <InputCadastro type="password" name="password" value={form.password} onChange={handleInputChange} required />

            <TextInput>Confirmar Senha</TextInput>
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            <InputCadastro type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleInputChange} required />

            <TextInput>Contato (Celular)</TextInput>
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            <InputCadastro name="phone" value={form.phone} onChange={handleInputChange} required />
            
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

