import { motion } from "framer-motion";
import { ArrowDown, Zap, GitBranch, Eye } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Decision Intelligence</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
            <span className="text-foreground">Explore Every</span>
            <br />
            <span className="text-gradient">Possible Future</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Describe your decision, and our cognitive AI engine will reveal how your choices
            branch into multiple futures—complete with trade-offs, insights, and actionable guidance.
          </p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            {[
              { icon: GitBranch, label: "Multi-Path Analysis" },
              { icon: Eye, label: "Hidden Assumptions" },
              { icon: Zap, label: "Actionable Insights" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border"
              >
                <feature.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{feature.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
            className="pt-12"
          >
            <ArrowDown className="w-5 h-5 text-muted-foreground mx-auto" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
