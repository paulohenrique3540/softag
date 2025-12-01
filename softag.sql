CREATE DATABASE softag;
USE softag;

CREATE TABLE contato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    assunto VARCHAR(150),
    mensagem TEXT
);

CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_email VARCHAR(100),  -- E-mail ou Usuário
    senha VARCHAR(100)
);

CREATE TABLE cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
    confirmar_senha VARCHAR(100)
);

CREATE TABLE recuperar_senha (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100)
);

