import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { feedbackService } from "../services/api";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Conectar ao Socket.IO
  useEffect(() => {
    const socketConnection = io(SOCKET_URL);
    setSocket(socketConnection);

    // Listener para novos feedbacks
    socketConnection.on("newFeedback", (feedback) => {
      setFeedbacks((prev) => [feedback, ...prev]);
      // Recarregar stats quando houver novo feedback
      loadStats();
    });

    // Listener para feedbacks deletados
    socketConnection.on("feedbackDeleted", ({ id }) => {
      setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== id));
      // Recarregar stats quando feedback for deletado
      loadStats();
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // Carregar feedbacks
  const loadFeedbacks = async () => {
    try {
      setError(null);
      const data = await feedbackService.getFeedbacks();
      setFeedbacks(data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar feedbacks:", err);
    }
  };

  // Carregar estatísticas
  const loadStats = async () => {
    try {
      setError(null);
      const data = await feedbackService.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar estatísticas:", err);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        await Promise.all([loadFeedbacks(), loadStats()]);
      } catch (err) {
        console.error("Erro ao carregar dados iniciais:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Criar novo feedback
  const createFeedback = async (feedbackData) => {
    try {
      setError(null);
      const newFeedback = await feedbackService.createFeedback(feedbackData);
      // O feedback será adicionado via Socket.IO
      return newFeedback;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Deletar feedback
  const deleteFeedback = async (id) => {
    try {
      setError(null);
      await feedbackService.deleteFeedback(id);
      // O feedback será removido via Socket.IO
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    feedbacks,
    stats,
    loading,
    error,
    createFeedback,
    deleteFeedback,
    refreshData: () => {
      loadFeedbacks();
      loadStats();
    },
  };
};
