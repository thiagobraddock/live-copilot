import { useState } from 'react';
import { Plus, RefreshCw, Radio } from 'lucide-react';
import * as Toast from '@radix-ui/react-toast';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import CSATDisplay from './components/CSATDisplay';
import { useFeedback } from './hooks/useFeedback';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const { feedbacks, stats, loading, error, createFeedback, refreshData } = useFeedback();

  const handleSubmitFeedback = async (feedbackData) => {
    setIsSubmitting(true);
    try {
      await createFeedback(feedbackData);
      setIsFormOpen(false);
      setToastMessage('Feedback enviado com sucesso!');
      setToastOpen(true);
    } catch (err) {
      setToastMessage('Erro ao enviar feedback. Tente novamente.');
      setToastOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <Toast.Provider swipeDirection="right">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Radio className="w-8 h-8 text-red-500" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Live Feedback</h1>
                  <p className="text-sm text-gray-600">Sistema de avaliação em tempo real</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={refreshData}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar
                </button>
                
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Avaliar Live
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <p className="text-sm">
                <strong>Erro:</strong> {error}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CSAT Display */}
            <div className="lg:col-span-1">
              <CSATDisplay stats={stats} />
            </div>

            {/* Feedback List */}
            <div className="lg:col-span-2">
              <FeedbackList feedbacks={feedbacks} />
            </div>
          </div>
        </main>

        {/* Feedback Form Modal */}
        <FeedbackForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmitFeedback}
          isSubmitting={isSubmitting}
        />

        {/* Toast Notifications */}
        <Toast.Root
          className="bg-white rounded-md shadow-lg border border-gray-200 p-4 grid grid-cols-[auto_max-content] gap-x-3 items-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full"
          open={toastOpen}
          onOpenChange={setToastOpen}
        >
          <Toast.Description className="text-sm text-gray-700">
            {toastMessage}
          </Toast.Description>
          <Toast.Action
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
            altText="Fechar notificação"
          >
            OK
          </Toast.Action>
        </Toast.Root>

        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none" />
      </div>
    </Toast.Provider>
  );
}

export default App;
