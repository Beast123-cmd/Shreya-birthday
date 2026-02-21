import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { galleryData } from "@/data/loveData";
import { X } from "lucide-react";
import Masonry from './Masonry';

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selected, setSelected] = useState<number | null>(null);

  // Convert galleryData to Masonry format
  const masonryItems = galleryData.map((item, index) => ({
    id: `${index}`,
    img: item.image,
    url: "#",
    height: 300 + Math.floor(Math.random() * 200), // Random heights for masonry effect
  }));

  // Generate placeholder gradient colors for demo
  const gradients = [
    "from-primary/30 to-secondary/30",
    "from-secondary/30 to-primary/20",
    "from-primary/20 to-accent/30",
    "from-accent/30 to-primary/30",
    "from-secondary/20 to-primary/30",
    "from-primary/30 to-secondary/20",
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial from-[#f43f5e]/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-gradient mb-4">
            Our Memories
          </h2>
          <p className="text-muted-foreground">Moments I never want to forget</p>
        </motion.div>

        <Masonry
          items={masonryItems}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={1.05}
          blurToFocus
          colorShiftOnHover={false}
        />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              {galleryData[selected]?.image ? (
                <img
                  src={galleryData[selected].image}
                  alt={galleryData[selected].caption}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${gradients[selected]} flex items-center justify-center`}
                >
                  <span className="text-6xl">{galleryData[selected].caption.split(" ").pop()}</span>
                </div>
              )}
              <p className="text-center text-foreground/80 mt-4 font-display italic">
                {galleryData[selected].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
