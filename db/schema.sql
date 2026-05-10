-- Script de Criação do Banco de Dados iDropLab
-- SQL Server

CREATE TABLE clientes (
    id INT PRIMARY KEY IDENTITY(1,1),
    nome NVARCHAR(255) NOT NULL,
    telefone NVARCHAR(20),
    instagram NVARCHAR(100),
    data_cadastro DATETIME DEFAULT GETDATE()
);

CREATE TABLE iphones (
    id INT PRIMARY KEY IDENTITY(1,1),
    modelo NVARCHAR(100) NOT NULL,
    armazenamento NVARCHAR(50),
    cor NVARCHAR(50),
    estado NVARCHAR(50), -- Novo, Semi-novo, etc.
    saude_bateria INT,
    data_compra DATE,
    valor_compra DECIMAL(10, 2),
    data_venda DATE,
    valor_venda DECIMAL(10, 2),
    lucro AS (valor_venda - valor_compra),
    roi AS (CASE WHEN valor_compra > 0 THEN ((valor_venda - valor_compra) / valor_compra) * 100 ELSE 0 END),
    tempo_giro AS (DATEDIFF(day, data_compra, data_venda)),
    status NVARCHAR(20) DEFAULT 'Em estoque', -- Em estoque, Vendido, Parcelado
    origem_venda NVARCHAR(100),
    cliente_id INT FOREIGN KEY REFERENCES clientes(id),
    observacoes NVARCHAR(MAX)
);

CREATE TABLE pagamentos (
    id INT PRIMARY KEY IDENTITY(1,1),
    iphone_id INT FOREIGN KEY REFERENCES iphones(id),
    valor DECIMAL(10, 2) NOT NULL,
    data_pagamento DATETIME DEFAULT GETDATE(),
    metodo NVARCHAR(50) -- Pix, Cartão, Dinheiro
);

CREATE TABLE parcelas (
    id INT PRIMARY KEY IDENTITY(1,1),
    iphone_id INT FOREIGN KEY REFERENCES iphones(id),
    valor DECIMAL(10, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    status NVARCHAR(20) DEFAULT 'Pendente' -- Pendente, Pago
);
