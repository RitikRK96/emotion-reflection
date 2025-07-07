import EmotionForm from './components/EmotionForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-white tracking-tight">
          Emotion Reflection
        </h1>
        <EmotionForm />
      </div>
    </div>
  );
}

export default App;