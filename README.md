# 📰 Projeto de Gerenciamento de Artigos

Este projeto é uma aplicação fullstack para gerenciamento de artigos, com backend desenvolvido em **PHP (Laravel)** e frontend em **React + Tailwind CSS**.

---

## ✅ Requisitos

### 🔧 Backend (Laravel)
- PHP (recomenda-se versão 8.x ou superior)
- Composer
- MySQL

### 🌐 Frontend (React)
- Node.js (recomenda-se versão 18.x ou superior)
- npm (geralmente já vem com o Node)

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/codebr01/Sistema-de-Gerenciamento-de-Posts.git
```

### 2. Inicie o backend
Entre na pasta do projeto:
```bash
cd Sistema-de-Gerenciamento-de-Posts
```
Depois, acesse a pasta do backend:
```bash
cd backend
```
Em seguida, instale as dependencias do composer:
```bash
composer install
```
Depois, rode o comando:
```bash
php artisan migrate
```
PS: caso aparece uma mensagem de Yes ou No, digite Yes
Por fim, inicie a API:
```bash
php artisan serve
```

E sua API estará ouvindo em http://127.0.0.1:8000

### 3. Inicie o frontend

Abra um novo terminal e execute:

Entre na pasta do projeto:
```bash
cd Sistema-de-Gerenciamento-de-Posts
```
Depois, acesse a pasta do backend:
```bash
cd frontend
```
Em seguida, instale as dependencias do Node/React:
```bash
npm install
```
Por fim, inicie o front:
```bash
npm run dev
```

Isso iniciará o frontend React em http://localhost:5173
