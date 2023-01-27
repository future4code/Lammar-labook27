# Labook Backend

## Sobre o projeto

O Labook é uma rede social que permite aos usuários fazerem amizades, postarem fotos e comentarem nas publicações dos amigos.

## Documentação da API

A documentação da API está disponível no Postman: https://documenter.getpostman.com/view/15825728/TzXzEJ6G

## Como rodar o projeto

### Pré-requisitos

- Node.js
- NPM
- MySQL

### Instalação

1. Clone este repositório
`git clone https://github.com/seu-usuario/labook-backend.git`

2. Entre na pasta do projeto e instale as dependências
 `cd labook-backend npm install`

3. Crie um banco de dados MySQL
4. Crie um arquivo `.env` na raiz do projeto e preencha com as informações do seu banco de dados MySQL
5. Execute as migrations com `npm run migrations`
6. Inicie o servidor `npm start`

## Endpoints

### Criar usuário

- Método: POST
- Path: `/user/create`
- Body:
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```

### Criar post

- Método: POST
- Path: `/post`
- Body:
```json
{
    "photo": "string",
    "description": "string",
    "type": "string",
    "author_id": "string"
}
```
### Buscar post por ID

- Método: GET
- Path: `/post/:postId`

### Criar amizade

- Método: POST
- Path: `/friend/`
- Body:
```json
{
    "user_id": "string",
    "friend_id": "string"
}
```

### Desfazer amizade

- Método: DELETE
- Path: `/friend/:friendId`

### Ver feed

- Método: GET
- Path: `/feed/:userId`

### Ver post por tipo

- Método: GET
- Path: `/post/type/:type`

### Curtir post

- Método: POST
- Path: `/like`
- Body:
```json
{
    "user_id": "string",
    "post_id": "string"
}
```

### Descurtir post

- Método: DELETE
- Path: `/deslike/:postId`

### Comentar post

- Método: POST
- Path: `/comment`
- Body:
```json
{
    "user_id": "string",
    "post_id": "string",
    "comment": "string"
}
```

## Tecnologias

- Node.js
- Typescript
- Express
- MySQL
- Knex
- Dotenv
- UUID
- Ts-node-dev