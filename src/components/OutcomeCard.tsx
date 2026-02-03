import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, Lightbulb, Clock, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface Outcome {
  title: string;
  likelihood: "high" | "medium" | "low";
  timeframe: string;
  narrative: string;
  tradeoffs: string[];
  insights: string[];
  actionItems: string[];
}

interface OutcomeCardProps {
  outcome: Outcome;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const likelihoodConfig = {
  high: { color: "bg-success/20 text-success border-success/30", label: "High Probability" },
  medium: { color: "bg-accent/20 text-accent border-accent/30", label: "Moderate Probability" },
  low: { color: "bg-warning/20 text-warning border-warning/30", label: "Lower Probability" },
};

export function OutcomeCard({ outcome, index, isExpanded, onToggle }: OutcomeCardProps) {
  const config = likelihoodConfig[outcome.likelihood];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group"
    >
      <div
        className={`glass-panel rounded-2xl overflow-hidden transition-all duration-300 ${
          isExpanded ? "ring-2 ring-primary/50" : "hover:ring-1 hover:ring-border"
        }`}
      >
        {/* Header - Always visible */}
        <button
          onClick={onToggle}
          className="w-full p-6 text-left flex items-start justify-between gap-4"
        >
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                {config.label}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                {outcome.timeframe}
              </span>
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              {outcome.title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2"
          >
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </button>

        {/* Expanded Content */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-6 space-y-6">
            {/* Narrative */}
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{outcome.narrative}</ReactMarkdown>
            </div>

            {/* Trade-offs */}
            {outcome.tradeoffs.length > 0 && (
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-warning">
                  <AlertTriangle className="w-4 h-4" />
                  Potential Trade-offs
                </h4>
                <ul className="space-y-2">
                  {outcome.tradeoffs.map((tradeoff, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                      {tradeoff}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Insights */}
            {outcome.insights.length > 0 && (
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Lightbulb className="w-4 h-4" />
                  Key Insights
                </h4>
                <ul className="space-y-2">
                  {outcome.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Items */}
            {outcome.actionItems.length > 0 && (
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-success">
                  <TrendingUp className="w-4 h-4" />
                  Recommended Actions
                </h4>
                <ul className="space-y-2">
                  {outcome.actionItems.map((action, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
