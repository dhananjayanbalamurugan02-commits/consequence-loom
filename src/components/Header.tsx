import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="relative z-10">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-accent" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">
                NeuroPath
                <span className="text-gradient"> AI</span>
              </h1>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it works
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </a>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}
