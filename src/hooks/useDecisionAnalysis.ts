import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Outcome } from "@/components/OutcomeCard";

interface AnalysisResult {
  summary: string;
  outcomes: Outcome[];
}

export function useDecisionAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeDecision = async (decision: string, context: string, priorities: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-decision", {
        body: { decision, context, priorities },
      });

      if (fnError) {
        throw fnError;
      }

      if (data?.error) {
        if (data.status === 429) {
          setError("Rate limit exceeded. Please wait a moment and try again.");
        } else if (data.status === 402) {
          setError("Service temporarily unavailable. Please try again later.");
        } else {
          setError(data.error);
        }
        return null;
      }

      setResult(data);
      return data;
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Failed to analyze decision. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    analyzeDecision,
    isLoading,
    error,
    result,
    reset,
  };
}
