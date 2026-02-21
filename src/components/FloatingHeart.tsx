import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const FloatingHeart = () => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setShowSecret(true)}
        className="fixed bottom-24 right-4 z-40 text-primary/20 hover:text-primary/60 transition-colors"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        aria-label="Secret message"
      >
        <Heart className="w-4 h-4" fill="currentColor" />
      </motion.button>

      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-6"
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass rounded-2xl p-8 max-w-sm text-center glow-pink"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-4xl mb-4 block">🤫</span>
              <p className="font-display text-lg text-foreground mb-2">You found the secret!</p>
              <p className="text-sm text-muted-foreground">
                If you're reading this, just know — you are the reason I smile every single day. 💖
              </p>
              <button
                onClick={() => setShowSecret(false)}
                className="mt-6 text-xs text-primary hover:underline"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingHeart;
