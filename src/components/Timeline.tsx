import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { timelineData } from "@/data/loveData";
import { X } from "lucide-react";

const TimelineItem = ({ item, index }: { item: typeof timelineData[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`relative flex items-center mb-16 md:mb-24 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      >
        {/* Connector dot */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-pink z-10" />

        {/* Card */}
        <div className={`ml-12 md:ml-0 md:w-5/12 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
          <div 
            className="glass rounded-xl p-6 hover:glow-pink transition-all duration-500 cursor-pointer"
            onClick={() => setShowImage(true)}
          >
            <span className="font-mono text-xs text-primary tracking-wider">{item.date}</span>
            <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            <p className="text-xs text-primary mt-3 font-medium">Click to view memory</p>
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-6"
            onClick={() => setShowImage(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImage(false)}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="text-center mt-4">
                <h3 className="font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Timeline = () => {
  return (
    <section id="timeline" className="relative py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient mb-4">Our Story</h2>
        <p className="text-muted-foreground">Every moment led us here</p>
      </motion.div>

      {/* Timeline line */}
      <div className="absolute left-[22px] md:left-1/2 top-40 bottom-20 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />

      <div className="max-w-4xl mx-auto relative">
        {timelineData.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
