import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DecisionInput } from "@/components/DecisionInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import { PathVisualization } from "@/components/PathVisualization";
import { useDecisionAnalysis } from "@/hooks/useDecisionAnalysis";
import { toast } from "sonner";

const Index = () => {
  const { analyzeDecision, isLoading, error, result, reset } = useDecisionAnalysis();
  const [submittedDecision, setSubmittedDecision] = useState("");

  const handleSubmit = async (decision: string, context: string, priorities: string) => {
    setSubmittedDecision(decision);
    const analysisResult = await analyzeDecision(decision, context, priorities);
    
    if (!analysisResult && error) {
      toast.error(error);
    }
  };

  const handleReset = () => {
    reset();
    setSubmittedDecision("");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] bg-success/5 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 pb-20">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <HeroSection />
                
                {/* Loading visualization */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                  >
                    <div className="glass-panel rounded-2xl p-8 max-w-3xl mx-auto">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                          Mapping Possible Futures...
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Our cognitive AI is analyzing your decision across multiple timelines
                        </p>
                      </div>
                      <PathVisualization pathCount={3} isAnimating={true} />
                    </div>
                  </motion.div>
                )}

                <section id="decision-input" className="py-12">
                  <DecisionInput onSubmit={handleSubmit} isLoading={isLoading} />
                </section>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-12"
              >
                <AnalysisResults
                  decision={submittedDecision}
                  outcomes={result.outcomes}
                  summary={result.summary}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              NeuroPath AI — Explore every possible future before you choose.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
