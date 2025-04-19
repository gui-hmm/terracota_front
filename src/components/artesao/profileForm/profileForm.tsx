import React, { useState } from 'react';
import { FormContainer } from './profileFormStyle';
import { Artesao } from '../../../types/types';

interface Props {
  dados: Artesao;
  onSubmit: (dados: Artesao) => void;
}

const ProfileForm: React.FC<Props> = ({ dados, onSubmit }) => {
  const [formData, setFormData] = useState<Artesao>(dados);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="cpf" value={formData.cpf} onChange={handleChange} placeholder="CPF" />
      <input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" />
      <input name="senha" type="password" value={formData.senha} onChange={handleChange} placeholder="Senha" />
      <button type="submit">Salvar</button>
    </FormContainer>
  );
};

export default ProfileForm;
