<?php
$servername = "localhost";
$username = "root";
$password = "";

// Criar conexão sem especificar banco de dados
$conn = new mysqli($servername, $username, $password);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Criar banco de dados se não existir
$sql = "CREATE DATABASE IF NOT EXISTS softag_contacts";
if ($conn->query($sql) === TRUE) {
    echo "Banco de dados 'softag_contacts' criado com sucesso ou já existe.<br>";
} else {
    echo "Erro ao criar banco de dados: " . $conn->error . "<br>";
}

// Selecionar o banco de dados
$conn->select_db("softag_contacts");

// Criar tabela se não existir
$sql = "CREATE TABLE IF NOT EXISTS contacts (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Tabela 'contacts' criada com sucesso ou já existe.<br>";
} else {
    echo "Erro ao criar tabela: " . $conn->error . "<br>";
}

$conn->close();
echo "Configuração concluída.";
?>
