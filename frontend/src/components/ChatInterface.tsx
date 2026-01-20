"use client";

import { useState } from "react";
import type { QAResponse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowRight,
  Sparkles,
  Loader2,
  Briefcase,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

interface ChatInterfaceProps {
  history: QAResponse[];
  onAsk: (question: string) => Promise<void>;
  isLoading?: boolean;
}

const opinionModes = [
  {
    id: "ceo",
    label: "Explain to CEO",
    icon: Briefcase,
    prompt:
      "Give me a concise executive summary of this week's business performance that I can share with the CEO. Focus on key metrics, major wins, and critical issues. Keep it to 3-4 bullet points maximum.",
  },
  {
    id: "worry",
    label: "What should I worry about?",
    icon: AlertCircle,
    prompt:
      "Based on all the data from this week, what are the 2-3 things I should be most worried about right now? Be specific about the risks and potential impact.",
  },
  {
    id: "advice",
    label: "What would you do?",
    icon: Lightbulb,
    prompt:
      "If you were the VP of Operations, what would be your top 3 priorities this week based on the current data? Give me specific, actionable recommendations.",
  },
];

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

  const handleOpinionMode = async (prompt: string) => {
    if (isLoading) return;
    await onAsk(prompt);
  };

  const suggestedQuestions = [
    "What were the main customer complaints last week?",
    "How is the Q1 hiring plan progressing?",
    "What decisions were made about the mobile app?",
    "What are the top blockers for the engineering team?",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Opinion Mode Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {opinionModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Button
              key={mode.id}
              variant="outline"
              size="sm"
              onClick={() => handleOpinionMode(mode.prompt)}
              disabled={isLoading}
              className="gap-1.5"
            >
              <Icon className="w-3.5 h-3.5" />
              {mode.label}
            </Button>
          );
        })}
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 mb-4">
        <div className="space-y-4 pr-4">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex p-4 rounded-2xl mb-4 bg-info-bg">
                <Sparkles className="w-8 h-8 text-info" />
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
                  <Button
                    key={i}
                    variant="outline"
                    onClick={() => setQuestion(q)}
                    className="text-left justify-start h-auto px-4 py-3 rounded-xl"
                  >
                    {q}
                  </Button>
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
                        <Sparkles className="w-4 h-4 text-info" />
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
                    <Loader2 className="w-4 h-4 animate-spin text-info" />
                  </div>
                  <span className="text-sm text-foreground-muted">
                    Analyzing your data...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about your business..."
          className="pr-14"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={!question.trim() || isLoading}
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
}
