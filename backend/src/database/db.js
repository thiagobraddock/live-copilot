const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Configurar caminho do banco baseado no ambiente
const getDbPath = () => {
  if (process.env.NODE_ENV === "production") {
    // Railway usa /data como volume persistente
    return "/data/database.sqlite";
  } else {
    // Desenvolvimento usa pasta data local
    return path.join(__dirname, "../../data/database.sqlite");
  }
};

const dbPath = getDbPath();
let db;

function initDatabase() {
  return new Promise((resolve, reject) => {
    // Garantir que o diretório existe
    const dbDir = path.dirname(dbPath);

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log(`Diretório criado: ${dbDir}`);
    }

    console.log(`Caminho do banco: ${dbPath}`);

    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error("Erro ao conectar com o banco:", err);
        reject(err);
        return;
      }

      console.log("Conectado ao banco SQLite");

      // Criar tabela de feedbacks
      const createTable = `
        CREATE TABLE IF NOT EXISTS feedbacks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `;

      db.run(createTable, (err) => {
        if (err) {
          console.error("Erro ao criar tabela:", err);
          reject(err);
          return;
        }

        console.log("Tabela de feedbacks criada/verificada com sucesso");
        resolve();
      });
    });
  });
}

function getDatabase() {
  return db;
}

function closeDatabase() {
  return new Promise((resolve) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error("Erro ao fechar banco:", err);
        } else {
          console.log("Conexão com banco fechada");
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  initDatabase,
  getDatabase,
  closeDatabase,
};
