import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { reasonsData } from "@/data/loveData";
import { Heart } from "lucide-react";

const Reasons = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient mb-4">
            Reasons I Love You
          </h2>
          <p className="text-muted-foreground">An incomplete list — because there aren't enough words</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasonsData.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass rounded-xl p-6 cursor-default group hover:glow-pink transition-all duration-500"
            >
              <Heart className="w-4 h-4 text-primary mb-3 group-hover:scale-125 transition-transform" />
              <p className="text-sm text-foreground/80 leading-relaxed">{reason}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reasons;
