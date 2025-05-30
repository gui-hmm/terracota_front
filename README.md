# Terracota 🏺

Uma plataforma de e-commerce com propósito social, dedicada a conectar artesãos de Tracunhaém-PE a um público mais amplo, promovendo o desenvolvimento sustentável e a valorização da cultura local.

### 🚀 **[Acesse a demonstração ao vivo →](https://terracota.vercel.app/)**

![Deploy Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)
![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellowgreen?style=for-the-badge)
![Linguagem](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Framework](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

---

## 📜 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [🖼️ Demonstração / Screenshots](#-demonstração--screenshots)
- [🚀 Funcionalidades Principais](#-funcionalidades-principais)
  - [Para Clientes](#para-clientes-)
  - [Para Artesãos](#para-artesãos-)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [⚙️ Como Executar o Projeto](#️-como-executar-o-projeto)
- [🔗 API (Backend)](#-api-backend)
- [👥 Equipe](#-equipe)
- [📄 Licença](#-licença)

---

## 💡 Sobre o Projeto

**Terracota** é mais do que um marketplace. É uma organização nascida de uma iniciativa acadêmica da **Faculdade UNICAP (Recife)**, com o objetivo de apoiar e fortalecer a comunidade de artesãos da cidade de **Tracunhaém**, um polo de arte em cerâmica de Pernambuco.

Nossa plataforma oferece as ferramentas para que esses talentosos artistas possam gerenciar seus produtos, alcançar novos mercados e garantir o desenvolvimento sustentável de suas comunidades, valorizando a rica herança cultural do artesanato em barro.

---

## 🖼️ Demonstração / Screenshots

---

## 🚀 Funcionalidades Principais

### Para Clientes 🛒

- **Navegação Intuitiva:** Explore produtos na página inicial e em uma seção dedicada.
- **Carrinho de Compras Persistente:** Adicione produtos ao carrinho, que é salvo no `localStorage` para não se perder durante a navegação.
- **Autenticação de Usuário:** Sistema completo de login e cadastro.
- **Perfil de Usuário:** Visualize e atualize dados cadastrais e foto de perfil.
- **Checkout Seguro:** Integração com **Mercado Pago** para um processo de pagamento confiável.
- **Confirmação de Compra:** Lógica robusta para processar o retorno do gateway de pagamento e registrar a venda no backend.
- **Chatbot com IA:** Um assistente virtual integrado com a API **DeepSeek** para tirar dúvidas e oferecer suporte.

### Para Artesãos 🎨

- **Painel Exclusivo:** Área restrita para gerenciamento de produtos e vendas.
- **Gerenciamento de Produtos (CRUD):** Crie, visualize, edite e delete seus próprios produtos.
- **Upload de Imagens:** Sistema de envio de imagens em duas etapas (criação do produto e depois envio da foto associada).
- **Controle de Estoque:** Atualize a quantidade de produtos diretamente pelo painel.
- **Visualização de Vendas:** Acesso a um painel com o histórico de vendas (página `/minhasvendas`).

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

- **Frontend:**
  - [React](https://react.dev/) com [TypeScript](https://www.typescriptlang.org/)
  - [React Router v6](https://reactrouter.com/) para roteamento
- **Gerenciamento de Estado:**
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Redux Persist](https://github.com/rt2zz/redux-persist) para persistência do estado de autenticação
- **Estilização:**
  - [Styled Components](https://styled-components.com/)
- **Comunicação com API:**
  - [Axios](https://axios-http.com/)
- **Notificações:**
  - [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
- **Pagamentos:**
  - [@mercadopago/sdk-react](https://www.mercadopago.com.br/developers/pt/docs/sdks/official/sdk-react/introduction)
- **Outras Bibliotecas:**
  - [JWT Decode](https://github.com/auth0/jwt-decode) para decodificar tokens de autenticação
  - [React Markdown](https://github.com/remarkjs/react-markdown) para renderizar as respostas do chatbot

---

## ⚙️ Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd seu-repositorio
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    _ou, se você usa Yarn:_
    ```bash
    yarn install
    ```

4.  **Crie um arquivo de ambiente:**
    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione a URL da sua API backend a este arquivo:
      ```
      REACT_APP_API_URL=[https://spring-terracota-new.onrender.com/api](https://spring-terracota-new.onrender.com/api)
      ```
      *Substitua a URL pela URL do seu ambiente de desenvolvimento, se for diferente.*

5.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```

A aplicação estará disponível em `http://localhost:3000`.

---

## 🔗 API (Backend)

O backend desta aplicação foi desenvolvido em **Spring Boot** e está hospedado em um repositório separado. Ele é responsável por toda a lógica de negócio, gerenciamento de banco de dados e comunicação com APIs externas como a do DeepSeek e Mercado Pago.

➡️ **Repositório do Backend:** [Link para o seu repositório do backend aqui]

---

## 👥 Equipe

Este projeto foi desenvolvido com dedicação pela equipe da UNICAP - Recife:

- Andressa Rayane
- Guilherme Henrique
- Hylan Silva
- Ketyllen Oliveira
- Lucas Bernadino
- Welliana Maria

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE.md` para mais detalhes.