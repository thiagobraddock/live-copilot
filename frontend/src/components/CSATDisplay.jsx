import React from 'react';
import { TrendingUp, Users, Star } from 'lucide-react';

const CSATDisplay = ({ stats }) => {
  const getCSATColor = (csat) => {
    if (csat >= 80) return 'text-green-600 bg-green-100';
    if (csat >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCSATLabel = (csat) => {
    if (csat >= 80) return 'Excelente';
    if (csat >= 60) return 'Bom';
    if (csat >= 40) return 'Regular';
    return 'Ruim';
  };

  if (!stats || stats.totalFeedbacks === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-lg font-medium">Aguardando feedbacks...</p>
          <p className="text-sm">O CSAT será calculado quando houver avaliações.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Satisfação da Live</h2>
        <TrendingUp className="w-6 h-6 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* CSAT Score */}
        <div className="text-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCSATColor(stats.csat)}`}>
            <span className="text-2xl font-bold mr-1">{stats.csat}%</span>
            <span className="text-xs">CSAT</span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{getCSATLabel(stats.csat)}</p>
        </div>

        {/* Total Feedbacks */}
        <div className="text-center">
          <div className="flex items-center justify-center text-gray-700">
            <Users className="w-5 h-5 mr-1" />
            <span className="text-2xl font-bold">{stats.totalFeedbacks}</span>
          </div>
          <p className="text-gray-600 text-sm">Avaliações</p>
        </div>

        {/* Average Rating */}
        <div className="text-center">
          <div className="flex items-center justify-center text-gray-700">
            <Star className="w-5 h-5 mr-1 text-yellow-400" />
            <span className="text-2xl font-bold">{stats.averageRating}</span>
            <span className="text-gray-500 text-sm ml-1">/5</span>
          </div>
          <p className="text-gray-600 text-sm">Média</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Distribuição das Avaliações</h3>
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = stats.ratingDistribution[rating] || 0;
          const percentage = stats.totalFeedbacks > 0 ? (count / stats.totalFeedbacks) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-xs text-blue-800">
          <strong>CSAT (Customer Satisfaction Score):</strong> Porcentagem de clientes satisfeitos (avaliações 4 e 5 estrelas).
        </p>
      </div>
    </div>
  );
};

export default CSATDisplay;