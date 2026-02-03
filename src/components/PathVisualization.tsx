import { motion } from "framer-motion";

interface PathVisualizationProps {
  pathCount: number;
  isAnimating: boolean;
}

export function PathVisualization({ pathCount, isAnimating }: PathVisualizationProps) {
  const paths = Array.from({ length: pathCount }, (_, i) => i);

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <svg
        viewBox="0 0 400 150"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Central node */}
        <motion.circle
          cx="50"
          cy="75"
          r="8"
          className="fill-primary"
          initial={{ scale: 0 }}
          animate={{ scale: isAnimating ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0, repeatDelay: 1 }}
        />

        {/* Branching paths */}
        {paths.map((_, i) => {
          const yOffset = (i - (pathCount - 1) / 2) * 40;
          const endY = 75 + yOffset;
          const controlY = 75 + yOffset * 0.3;

          return (
            <motion.g key={i}>
              {/* Path line */}
              <motion.path
                d={`M 58 75 Q 150 ${controlY} 250 ${endY} T 370 ${endY}`}
                fill="none"
                stroke={`url(#gradient-${i})`}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: isAnimating ? 1 : 0.8, 
                  opacity: isAnimating ? [0.4, 1, 0.4] : 0.6 
                }}
                transition={{ 
                  pathLength: { duration: 1.5, delay: i * 0.2 },
                  opacity: { duration: 2, repeat: isAnimating ? Infinity : 0, delay: i * 0.2 }
                }}
              />
              
              {/* End node */}
              <motion.circle
                cx="370"
                cy={endY}
                r="6"
                className={i === 0 ? "fill-success" : i === pathCount - 1 ? "fill-warning" : "fill-accent"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5 + i * 0.2, duration: 0.3 }}
              />
            </motion.g>
          );
        })}

        {/* Gradient definitions */}
        <defs>
          {paths.map((_, i) => (
            <linearGradient key={i} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(186 100% 50%)" />
              <stop offset="50%" stopColor="hsl(265 90% 65%)" />
              <stop offset="100%" stopColor={
                i === 0 ? "hsl(160 84% 39%)" : 
                i === paths.length - 1 ? "hsl(38 92% 50%)" : 
                "hsl(265 90% 65%)"
              } />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute right-8 top-1/4 w-24 h-24 bg-success/20 rounded-full blur-3xl" />
        <div className="absolute right-8 bottom-1/4 w-24 h-24 bg-warning/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
