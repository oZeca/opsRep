"use client";

import { useState } from "react";
import type { QAResponse } from "@/lib/api";

interface ChatInterfaceProps {
  history: QAResponse[];
  onAsk: (question: string) => Promise<void>;
  isLoading?: boolean;
}

export function ChatInterface({
  history,
  onAsk,
  isLoading,
}: ChatInterfaceProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const q = question;
    setQuestion("");
    await onAsk(q);
  };

  const suggestedQuestions = [
    "What were the main customer complaints last week?",
    "How is the Q1 hiring plan progressing?",
    "What decisions were made about the mobile app?",
    "What are the top blockers for the engineering team?",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {history.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex p-4 rounded-2xl mb-4 bg-info-bg">
              <svg
                className="w-8 h-8 text-info"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Ask anything about your business
            </h3>
            <p className="text-sm mb-6 max-w-md mx-auto text-foreground-muted">
              I have access to your Slack conversations, Notion documents, and
              Stripe data. Ask me about decisions, customers, metrics, or
              anything else.
            </p>

            {/* Suggested Questions */}
            <div className="grid gap-2 max-w-lg mx-auto">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(q)}
                  className="text-left px-4 py-3 rounded-xl text-sm transition-smooth bg-surface border border-card-border text-foreground hover:bg-surface-hover hover:border-info-border"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          history.map((qa) => (
            <div key={qa.id} className="space-y-4">
              {/* Question */}
              <div className="flex justify-end">
                <div className="max-w-[80%] p-4 rounded-2xl rounded-tr-sm bg-info-bg border border-info-border">
                  <p className="text-sm text-foreground">{qa.question}</p>
                </div>
              </div>

              {/* Answer */}
              <div className="flex justify-start">
                <div className="max-w-[85%] glass-card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-info-bg">
                      <svg
                        className="w-4 h-4 text-info"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-info">
                      AI Assistant
                    </span>
                    <span className="text-xs text-foreground-subtle">•</span>
                    <span className="text-xs text-foreground-subtle">
                      {Math.round(qa.confidence * 100)}% confident
                    </span>
                  </div>

                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="text-sm whitespace-pre-wrap text-foreground">
                      {qa.answer}
                    </div>
                  </div>

                  {/* Sources */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-surface-border">
                    <span className="text-xs text-foreground-subtle">
                      Sources:
                    </span>
                    {qa.sources.map((source, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md text-xs bg-surface text-foreground-muted"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass-card p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-info-bg">
                  <svg
                    className="w-4 h-4 animate-spin text-info"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <span className="text-sm text-foreground-muted">
                  Analyzing your data...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about your business..."
          className="w-full px-5 py-4 pr-14 rounded-2xl transition-smooth focus:outline-none bg-surface border border-card-border text-foreground focus:border-info-border"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!question.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-smooth disabled:opacity-50 disabled:cursor-not-allowed bg-info text-foreground hover:bg-primary"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
