const express = require("express");
const { getDatabase } = require("../database/db");

const router = express.Router();

// Criar novo feedback
router.post("/", (req, res) => {
  const { name, rating, comment } = req.body;

  // Validação
  if (!name || !rating) {
    return res.status(400).json({
      error: "Nome e rating são obrigatórios",
    });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({
      error: "Rating deve ser entre 1 e 5",
    });
  }

  const db = getDatabase();
  const query =
    "INSERT INTO feedbacks (name, rating, comment) VALUES (?, ?, ?)";

  db.run(query, [name, rating, comment || ""], function (err) {
    if (err) {
      console.error("Erro ao inserir feedback:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    // Buscar o feedback recém-criado
    db.get(
      "SELECT * FROM feedbacks WHERE id = ?",
      [this.lastID],
      (err, feedback) => {
        if (err) {
          console.error("Erro ao buscar feedback:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        // Emitir evento para clientes conectados
        req.io.emit("newFeedback", feedback);

        res.status(201).json(feedback);
      }
    );
  });
});

// Listar todos os feedbacks
router.get("/", (req, res) => {
  const db = getDatabase();
  const query = "SELECT * FROM feedbacks ORDER BY created_at DESC";

  db.all(query, [], (err, feedbacks) => {
    if (err) {
      console.error("Erro ao buscar feedbacks:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json(feedbacks);
  });
});

// Obter estatísticas e CSAT
router.get("/stats", (req, res) => {
  const db = getDatabase();

  // Query para obter estatísticas completas
  const statsQuery = `
    SELECT 
      COUNT(*) as total_feedbacks,
      AVG(rating) as average_rating,
      SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) as satisfied_count,
      SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as rating_5,
      SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as rating_4,
      SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as rating_3,
      SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as rating_2,
      SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as rating_1
    FROM feedbacks
  `;

  db.get(statsQuery, [], (err, stats) => {
    if (err) {
      console.error("Erro ao buscar estatísticas:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    // Calcular CSAT (Customer Satisfaction Score)
    // CSAT = (Número de respostas satisfeitas / Total de respostas) * 100
    // Consideramos satisfeitas as avaliações 4 e 5
    const csat =
      stats.total_feedbacks > 0
        ? Math.round((stats.satisfied_count / stats.total_feedbacks) * 100)
        : 0;

    const result = {
      totalFeedbacks: stats.total_feedbacks,
      averageRating:
        stats.total_feedbacks > 0 ? Number(stats.average_rating.toFixed(2)) : 0,
      csat: csat,
      ratingDistribution: {
        5: stats.rating_5,
        4: stats.rating_4,
        3: stats.rating_3,
        2: stats.rating_2,
        1: stats.rating_1,
      },
      satisfiedCount: stats.satisfied_count,
    };

    res.json(result);
  });
});

// Deletar feedback (para administração)
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const db = getDatabase();

  db.run("DELETE FROM feedbacks WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Erro ao deletar feedback:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Feedback não encontrado" });
    }

    // Emitir evento para atualizar clientes
    req.io.emit("feedbackDeleted", { id: parseInt(id) });

    res.json({ message: "Feedback deletado com sucesso" });
  });
});

module.exports = router;
