import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PathVisualization } from "./PathVisualization";
import { OutcomeCard, Outcome } from "./OutcomeCard";

interface AnalysisResultsProps {
  decision: string;
  outcomes: Outcome[];
  summary: string;
  onReset: () => void;
}

export function AnalysisResults({ decision, outcomes, summary, onReset }: AnalysisResultsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-4"
      >
        <div className="space-y-2">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Start New Analysis
          </button>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Future Pathways Analysis
          </h2>
          <p className="text-muted-foreground max-w-2xl">{decision}</p>
        </div>

        <Button onClick={onReset} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4" />
          New Decision
        </Button>
      </motion.div>

      {/* Path Visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-2xl p-6"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Branching Possibilities
        </h3>
        <PathVisualization pathCount={outcomes.length} isAnimating={false} />
      </motion.div>

      {/* Summary */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-2xl p-6"
        >
          <h3 className="text-lg font-display font-semibold text-foreground mb-3">
            Executive Summary
          </h3>
          <p className="text-muted-foreground leading-relaxed">{summary}</p>
        </motion.div>
      )}

      {/* Outcome Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-display font-semibold text-foreground">
          Possible Outcomes
        </h3>
        {outcomes.map((outcome, index) => (
          <OutcomeCard
            key={index}
            outcome={outcome}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
