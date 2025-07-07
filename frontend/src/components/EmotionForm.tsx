import { useState, useEffect, FormEvent, KeyboardEvent } from "react";
import EmotionResult from "./EmotionResult";
import { EmotionResponse } from "../types";

function EmotionForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<EmotionResponse | null>(null);
  const [delayedResult, setDelayedResult] = useState<EmotionResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setDelayedResult(null);

    try {
      const response = await fetch(
        "https://backend-34pn.onrender.com/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) throw new Error("Error analyzing emotion");

      const data: EmotionResponse = await response.json();
      setTimeout(() => {
        setResult(data);
        setLoading(false); // stop loading after delay
      }, 600);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result) {
      const delay = setTimeout(() => {
        setDelayedResult(result);
      }, 300);
      return () => clearTimeout(delay);
    }
  }, [result]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="How are you feeling today?"
          className={`w-full h-36 p-4 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 resize-none backdrop-blur-sm ${
            loading ? "animate-pulse" : ""
          }`}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl disabled:bg-zinc-600 disabled:cursor-not-allowed transition-all duration-300 font-medium shadow-md hover:shadow-xl"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Analyzing...
            </span>
          ) : (
            "Analyze Emotion"
          )}
        </button>
      </form>

      {error && (
        <p className="text-red-400 text-center font-medium animate-fadeIn">
          {error}
        </p>
      )}

      {delayedResult && (
        <div className="animate-fadeIn">
          <EmotionResult
            emotion={delayedResult.emotion}
            confidence={delayedResult.confidence}
          />
        </div>
      )}
    </div>
  );
}

export default EmotionForm;
