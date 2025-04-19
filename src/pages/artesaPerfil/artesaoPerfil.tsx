import React, { useState } from 'react';
import UploadImage from '../../components/artesao/uploadImage/uploadImage';
import ProfileForm from '../../components/artesao/profileForm/profileForm';
import { Container } from './artesaoPerfilStyle';
import { Artesao } from '../../types/types';
import Footer from '../../components/footer/footer';

const ArtesaoPerfil: React.FC = () => {
  // Mock de dados do artesão (você pode buscar da API depois)
  const [artesao, setArtesao] = useState<Artesao>({
    id: 1,
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: '',
    imagemUrl: ''
  });

  const handleUpload = (file: File) => {
    // Aqui você pode chamar o backend pra salvar a imagem
    console.log('Imagem enviada:', file);

    // Exemplo de atualização do estado com uma URL mockada
    const urlImagem = URL.createObjectURL(file);
    setArtesao((prev) => ({ ...prev, foto: urlImagem }));
  };

  const handleSubmit = (dadosAtualizados: Artesao) => {
    console.log('Dados enviados:', dadosAtualizados);
    // Aqui você pode enviar os dados para o backend
    setArtesao(dadosAtualizados);
  };

  return (
    <>
        
        <Container>
        <h2>Meu Perfil</h2>
        <UploadImage onUpload={handleUpload} />
        <ProfileForm dados={artesao} onSubmit={handleSubmit} />
        </Container>
        <Footer/>
    </>
  );
};

export default ArtesaoPerfil;
