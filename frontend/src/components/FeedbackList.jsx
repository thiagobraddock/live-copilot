import React from 'react';
import { MessageCircle, User, Calendar } from 'lucide-react';
import * as Separator from '@radix-ui/react-separator';
import StarRating from './StarRating';

const FeedbackList = ({ feedbacks }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Nenhum feedback ainda</h3>
          <p className="text-sm">
            Seja o primeiro a avaliar esta live! Os feedbacks aparecerão aqui em tempo real.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Feedbacks Recebidos ({feedbacks.length})
        </h2>
        <MessageCircle className="w-6 h-6 text-blue-600" />
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {feedbacks.map((feedback, index) => (
          <div key={feedback.id} className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{feedback.name}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(feedback.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <StarRating rating={feedback.rating} disabled={true} />
                  <span className="text-sm text-gray-600 ml-2">
                    {feedback.rating}/5
                  </span>
                </div>
              </div>
              
              {feedback.comment && (
                <div className="mt-3">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    "{feedback.comment}"
                  </p>
                </div>
              )}
            </div>
            
            {index < feedbacks.length - 1 && (
              <Separator.Root className="h-px bg-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;