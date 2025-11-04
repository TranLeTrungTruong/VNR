import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSystemInfo, type SystemInfo } from "../utils/systemInfo";
import { AboutHero } from "./about/components/AboutHero";
import { AboutTechHighlights } from "./about/components/AboutTechHighlights";
import { AboutAITrainingSection } from "./about/components/AboutAITrainingSection";
import { AboutTeamSection } from "./about/components/AboutTeamSection";

export default function About() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSystemInfo = async () => {
      setLoading(true);
      try {
        const info = await getSystemInfo();
        setSystemInfo(info);
      } catch (error) {
        console.error("Failed to load system info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSystemInfo();
  }, []);

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-900/35 via-gold-700/20 to-black/60" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
        animate={{ x: ["0%", "180%"] }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <AboutHero />
          <AboutTechHighlights loading={loading} systemInfo={systemInfo} />
          <AboutAITrainingSection />
          <AboutTeamSection />
        </motion.div>
      </div>
    </section>
  );
}
