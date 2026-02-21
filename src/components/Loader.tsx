import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "Initializing surprise…",
  "Loading memories…",
  "Authenticating love…",
  "Access granted ❤️",
];

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLine >= lines.length) {
      setTimeout(onComplete, 800);
      return;
    }

    const text = lines[currentLine];
    let charIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => setCurrentLine((prev) => prev + 1), 600);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentLine, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-lg px-6 w-full">
        <div className="glass rounded-lg p-6 md:p-8">
          <div className="space-y-3">
            {lines.slice(0, currentLine).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="font-mono text-sm text-muted-foreground"
              >
                <span className="text-primary mr-2">$</span>
                {line}
              </motion.div>
            ))}
            {currentLine < lines.length && (
              <div className="font-mono text-sm text-foreground">
                <span className="text-primary mr-2">$</span>
                {displayedText}
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse-glow" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
