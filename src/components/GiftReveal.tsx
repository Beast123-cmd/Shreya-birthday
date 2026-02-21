import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import confetti from "canvas-confetti";
import { Gift } from "lucide-react";

const GiftReveal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);

    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#ff4d6d", "#c77dff", "#ff85a1", "#d4a5ff"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="text-center max-w-lg">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="pre-reveal"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-8"
            >
              <motion.p
                className="font-mono text-xs tracking-[0.3em] uppercase text-primary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                One last thing…
              </motion.p>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gift className="w-20 h-20 mx-auto text-primary" strokeWidth={1} />
              </motion.div>

              <motion.button
                onClick={handleReveal}
                className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase glow-pink hover:brightness-110 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Unlock Your Gift 🎁
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="post-reveal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                className="text-6xl md:text-8xl"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                🎉
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient">
                Happy Birthday!
              </h2>

              <p className="text-foreground/70 leading-relaxed max-w-md mx-auto">
                You are the most precious gift life has ever given me.
                Today and every day, I celebrate you — my love, my best friend,
                my everything.
              </p>

              <motion.div
                className="text-4xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.div>

              <p className="font-display text-xl italic text-primary">
                I love you forever and always
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GiftReveal;
