import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface DecisionInputProps {
  onSubmit: (decision: string, context: string, priorities: string) => void;
  isLoading: boolean;
}

const exampleDecisions = [
  "Should I accept a higher-paying job in a new city, leaving my support network behind?",
  "Is now the right time to start my own business while I have stable employment?",
  "Should I pursue a graduate degree or continue gaining work experience?",
];

export function DecisionInput({ onSubmit, isLoading }: DecisionInputProps) {
  const [decision, setDecision] = useState("");
  const [context, setContext] = useState("");
  const [priorities, setPriorities] = useState("");
  const [step, setStep] = useState(0);

  const handleSubmit = () => {
    if (decision.trim()) {
      onSubmit(decision, context, priorities);
    }
  };

  const handleExampleClick = (example: string) => {
    setDecision(example);
    setStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-panel rounded-2xl p-8 space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((s) => (
            <motion.div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s <= step ? "bg-primary w-12" : "bg-muted w-8"
              }`}
              animate={{ scale: s === step ? 1.1 : 1 }}
            />
          ))}
        </div>

        {step === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Describe Your Decision
              </h2>
              <p className="text-muted-foreground">
                What choice are you facing? Be as specific as possible.
              </p>
            </div>

            <Textarea
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              placeholder="I'm trying to decide whether to..."
              className="min-h-[120px] bg-background/50 border-border focus:border-primary focus:ring-primary/20 resize-none text-foreground placeholder:text-muted-foreground"
            />

            {/* Example Decisions */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-warning" />
                Try an example:
              </p>
              <div className="flex flex-wrap gap-2">
                {exampleDecisions.map((example, i) => (
                  <button
                    key={i}
                    onClick={() => handleExampleClick(example)}
                    className="text-sm px-3 py-2 rounded-lg bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200 text-left"
                  >
                    {example.substring(0, 50)}...
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setStep(1)}
              disabled={!decision.trim()}
              className="w-full"
              variant="hero"
              size="lg"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Add Context
              </h2>
              <p className="text-muted-foreground">
                What's your current situation? Any constraints or circumstances?
              </p>
            </div>

            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="I currently work at... My financial situation is... My timeline is..."
              className="min-h-[120px] bg-background/50 border-border focus:border-primary focus:ring-primary/20 resize-none text-foreground placeholder:text-muted-foreground"
            />

            <div className="flex gap-3">
              <Button onClick={() => setStep(0)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(2)} variant="hero" className="flex-1">
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Define Your Priorities
              </h2>
              <p className="text-muted-foreground">
                What matters most to you in this decision?
              </p>
            </div>

            <Textarea
              value={priorities}
              onChange={(e) => setPriorities(e.target.value)}
              placeholder="Financial stability, work-life balance, career growth, family, personal fulfillment..."
              className="min-h-[120px] bg-background/50 border-border focus:border-primary focus:ring-primary/20 resize-none text-foreground placeholder:text-muted-foreground"
            />

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                variant="neural"
                size="lg"
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                    Analyzing Futures...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Explore Possible Futures
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
