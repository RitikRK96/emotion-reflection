interface EmotionResultProps {
  emotion: string;
  confidence: number;
}

const EmotionResult: React.FC<EmotionResultProps> = ({ emotion, confidence }) => {
  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      Happy: 'bg-green-500',
      Sad: 'bg-blue-500',
      Anxious: 'bg-yellow-500',
      Excited: 'bg-pink-500',
      Angry: 'bg-red-500',
      Calm: 'bg-teal-500',
    };
    return colors[emotion] || 'bg-violet-500';
  };

  return (
    <div className="p-6 bg-zinc-900/80 rounded-xl shadow-lg border border-zinc-700/50 text-white backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">Analysis Result</h2>
      <div className="space-y-4">
        <p className="flex items-center gap-2">
          <span className="font-medium">Emotion:</span>
          <span className={`px-3 py-1 rounded-full text-sm ${getEmotionColor(emotion)} text-white`}>
            {emotion}
          </span>
        </p>
        <p>
          <span className="font-medium">Confidence:</span> {(confidence * 100).toFixed(1)}%
        </p>
        <div className="w-full bg-zinc-700/50 rounded-full h-3">
          <div
            className={`h-3 rounded-full ${getEmotionColor(emotion)} transition-all duration-700 ease-out`}
            style={{ width: `${confidence * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EmotionResult;