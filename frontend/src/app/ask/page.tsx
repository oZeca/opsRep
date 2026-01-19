"use client";

import { useEffect, useState } from "react";
import { Header, ChatInterface } from "@/components";
import { api, type QAResponse } from "@/lib/api";

export default function AskPage() {
  const [history, setHistory] = useState<QAResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await api.getQAHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch Q&A history:", error);
      } finally {
        setInitialLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const handleAsk = async (question: string) => {
    setIsLoading(true);
    try {
      const response = await api.askQuestion(question);
      setHistory((prev) => [...prev, response]);
    } catch (error) {
      console.error("Failed to ask question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-2xl mb-4 animate-pulse-glow bg-info-bg">
            <svg
              className="w-8 h-8 animate-spin text-info"
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
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
          <p className="text-foreground-muted">Loading AI assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <Header
        title="Ask AI"
        subtitle="Get instant answers about your business data"
      />

      <div className="flex-1 min-h-0">
        <ChatInterface
          history={history}
          onAsk={handleAsk}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
