// components/StatsSection.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import {
  BookOpen,
  Globe,
  CircleCheck as CheckCircle,
  Users,
} from "lucide-react";
import { useRef, useMemo } from "react";
import articles from "../data/articles.json";
import chapters from "../data/chapters.json";
import quizzesData from "../data/quizzes.json";

function useComputedStats() {
  // articles.json is an array
  const articlesCount = Array.isArray(articles) ? articles.length : 0;

  // chapters.json is an array
  const chaptersCount = Array.isArray(chapters) ? chapters.length : 0;

  // quizzes.json is an object with chapter keys -> arrays of quizzes
  const quizzesCount = useMemo(() => {
    try {
      const groups = quizzesData as Record<string, unknown>;
      const lists = Object.values(groups).filter(Array.isArray) as Array<unknown[]>;
      return lists.reduce((sum, list) => sum + list.length, 0);
    } catch {
      return 0;
    }
  }, []);

  return [
    { icon: BookOpen, value: articlesCount, labelVi: "Bài viết", labelEn: "Articles" },
    { icon: Globe, value: 2, labelVi: "Ngôn ngữ hỗ trợ", labelEn: "Languages Supported" },
    { icon: CheckCircle, value: quizzesCount, labelVi: "Bài quiz", labelEn: "Quizzes" },
    { icon: Users, value: chaptersCount, labelVi: "Chương học", labelEn: "Learning Chapters" },
  ] as const;
}

export default function StatsSection() {
  const { i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";
  const stats = useComputedStats();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Nền đồng bộ Hero: gradient đỏ→vàng + vignette + light sweep nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-900/35 via-gold-700/20 to-black/60" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_200px_rgba(0,0,0,0.55)]" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
        animate={{ x: ["0%", "180%"] }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -12,
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
              className="group relative text-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 md:p-7
                         shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              {/* viền phát sáng rất nhẹ khi hover */}
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                               ring-1 ring-transparent [background:radial-gradient(1200px_circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.12),transparent_40%)]"
                whileHover={{ scale: 1.1 }}
              />

              {/* Rotating glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30"
                style={{
                  background: "linear-gradient(90deg, #eab308, #ffe8a3, #ffffff)",
                  filter: "blur(20px)",
                  zIndex: -1
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              {/* Icon nền gradient đồng bộ CTA */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4
                              bg-gradient-to-br from-red-600 to-yellow-500 text-white shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className="h-8 w-8" />
              </motion.div>

              <div className="text-3xl font-extrabold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] mb-1">
                <CountUp
                  end={stat.value}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                  suffix={stat.suffix || ""}
                />
              </div>

              <div className="text-white/80 font-medium">
                {isVietnamese ? stat.labelVi : stat.labelEn}
              </div>

              {/* gạch chân gradient nhấn sắc độ */}
              <div
                className="mx-auto mt-3 h-[2px] w-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(239,68,68,0.9) 0%, rgba(234,179,8,0.9) 50%, rgba(239,68,68,0.9) 100%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Parallax floating orbs */}
        <motion.div
          style={{ y, rotate }}
          className="absolute -top-10 left-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
          className="absolute -bottom-10 right-20 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"
        />
      </motion.div>
    </section>
  );
}
