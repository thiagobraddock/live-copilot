import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const feedbackService = {
  // Criar novo feedback
  createFeedback: async (feedbackData) => {
    try {
      const response = await api.post("/feedback", feedbackData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Erro ao enviar feedback");
    }
  },

  // Buscar todos os feedbacks
  getFeedbacks: async () => {
    try {
      const response = await api.get("/feedback");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Erro ao buscar feedbacks"
      );
    }
  },

  // Buscar estatísticas e CSAT
  getStats: async () => {
    try {
      const response = await api.get("/feedback/stats");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Erro ao buscar estatísticas"
      );
    }
  },

  // Deletar feedback (para administração)
  deleteFeedback: async (id) => {
    try {
      const response = await api.delete(`/feedback/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Erro ao deletar feedback"
      );
    }
  },
};

export default api;
