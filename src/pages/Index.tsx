import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import LoveCounter from "@/components/LoveCounter";
import Reasons from "@/components/Reasons";
import Gallery from "@/components/Gallery";
import Letter from "@/components/Letter";
import GiftReveal from "@/components/GiftReveal";
import FloatingHeart from "@/components/FloatingHeart";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <FloatingHeart />
          <main className="relative">
            <Hero />
            <Timeline />
            <LoveCounter />
            <Reasons />
            <Gallery />
            <Letter />
            <GiftReveal />
          </main>
        </>
      )}
    </>
  );
};

export default Index;
