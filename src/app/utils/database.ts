import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

// Script SQL para criar as tabelas
const DDL_SCRIPT = `
  CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    status TEXT CHECK(status in('ACTIVE','DISABLED')) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
  );

  CREATE TABLE IF NOT EXISTS Stocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    companyName TEXT NOT NULL,
    symbol TEXT UNIQUE NOT NULL,
    currentPrice INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS Transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    walletId INTEGER NOT NULL,
    stockId INTEGER NOT NULL,
    type TEXT CHECK(type IN ('BUY', 'SELL'))  NOT NULL,
    quantity INTEGER NOT NULL,
    pricePerStock INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (walletId) REFERENCES Wallet(id),
    FOREIGN KEY (stockId) REFERENCES Stocks(id)
  );

  CREATE TABLE IF NOT EXISTS Wallet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    balance INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id)
  );

  CREATE TABLE IF NOT EXISTS StocksWallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    walletId INTEGER NOT NULL,
    stockId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (walletId) REFERENCES Wallet(id),
    FOREIGN KEY (stockId) REFERENCES Stocks(id)
  );
`;

// Conectar ao banco de dados SQLite
const database = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    // Criar as tabelas se elas não existirem
    database.exec(DDL_SCRIPT, (err) => {
      if (err) {
        throw err;
      }
    });
  }
});

// Exportar a instância do banco de dados para ser utilizada em outros lugares do projeto
export default database;
