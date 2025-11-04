import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ParticleEffect from "../pages/ParticleEffect";
import FloatingElements from "../pages/FloatingElements";
import ThreeBackground from "./ThreeBackground";

const IMAGES = [
  "https://nguonluc.com.vn/uploads/images/blog/huyenvan/2022/09/02/nlntv-tuyen-ngon-dl-1662080057.jpg",
  "https://i.pinimg.com/736x/ce/3d/e5/ce3de5ac53cb51299ea0a04e82a6859d.jpg",
  "https://cdn.nhandan.vn/images/7b3ccb4afe74154406d966bb9665f30a030c0d7d02e3c67c9e201d2a6f47ff8cecaa153a32d1eaedf9a420f17fbc6b6fb7ae13cda333b1a658a4aa09dbd85477/bac-doc-tuyen-ngon.jpg",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh8cwfHcTSWLww2_twDEuoG0nDKf98lOb2XHFzYE7KNFYa_C1934tuYtOtsc7l1HayQDiz9qVI8yDGF9VypO6P_J22W2wGJVwKRIywWAun4WVe-ZOM3bf1TovFcL0n39lNxMFkVthp3JUAUJmlgqlpX46gwvygn3tv1sVtbzSfIbfHDhgi8RQBRxD_zZsQ/s1600-rw/tuyen-ngon-doc-lap-2-9.jpg"
];

export default function HeroSection() {
  const { t } = useTranslation();
  const titleWords = useMemo(() => t("home.hero.title").split(" "), [t]);
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => IMAGES.map(() => false));
  const timerRef = useRef<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Preload images
  useEffect(() => {
    IMAGES.forEach((src, i) => {
      const img = new Image();
      img.onload = () =>
        setLoaded((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      img.src = src;
    });
  }, []);

  // Slideshow interval
  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setIdx((p) => (p + 1) % IMAGES.length);
    }, 7000); // 7s mỗi slide
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {loaded[idx] && (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.div
                // Ken Burns: zoom chậm
                initial={{ scale: 1.05 }}
                animate={{ scale: 1.18 }}
                transition={{ duration: 12, ease: "linear" }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${IMAGES[idx]}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "saturate(1.05) contrast(1.05)",
                }}
              />
              {/* Overlay gradient đỏ → vàng → đen (đồng bộ palette) */}
              <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-800/70 via-gold-700/25 to-black/80" />
              {/* Vignette viền tối */}
              <div className="pointer-events-none absolute inset-0 ring-0 [box-shadow:inset_0_0_200px_rgba(0,0,0,0.6)]" />
              {/* Light sweep chạy ngang (ánh đèn lễ đài) */}
              <motion.div
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/5 blur-3xl"
                animate={{ x: ["0%", "180%"] }}
                transition={{ duration: 14, ease: "linear", repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layer hiệu ứng 3D & Parallax */}
      <div className="absolute inset-0">
        <ThreeBackground />
        <ParticleEffect />
        <FloatingElements />
      </div>

      {/* Nội dung */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          x: smoothMouseX,
          y: smoothMouseY
        }}
        layout={false}
      >
        {/* Chip khẩu hiệu + cờ VN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 shadow-lg"
        >
          {/* VN Flag */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="22"
            viewBox="0 0 512 341"
            className="w-8 h-6"
            aria-label="Quốc kỳ Việt Nam"
          >
            <rect width="512" height="341" fill="#da251d" />
            <polygon
              fill="#ff0"
              points="256,60 273,126 343,126 288,168 305,234 256,192 207,234 224,168 169,126 239,126"
            />
          </svg>
          <span className="text-white/90 text-sm font-medium">
            Độc Lập - Tự Do - Hạnh Phúc
          </span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </motion.div>

        {/* Tiêu đề */}
        <motion.div
          className="mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight flex flex-wrap justify-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            {titleWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariants}
                whileHover={{
                  scale: 1.1,
                  rotateZ: [-2, 2, -2],
                  transition: { duration: 0.3 }
                }}
                className="inline-block mr-3 bg-gradient-to-r from-gold-200 via-amber-100 to-white bg-clip-text text-transparent will-change-transform cursor-default"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Phụ đề */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-2xl text-white/85 max-w-4xl mx-auto mb-10 leading-relaxed will-change-transform drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
        >
          {t("home.hero.subtitle")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/chapters">
            <motion.button
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200"
              whileHover={{ scale: 1.05, translateY: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative flex items-center space-x-2">
                <span>{t("home.chapters.explore")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>

          <Link to="/quiz">
            <motion.button
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold text-lg transition-all duration-200 hover:bg-white/20 hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05, translateY: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>{t("quiz.title")}</span>
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>


     {/* Badge ngày lịch sử 2/9 */}
        <motion.div
        initial={{ opacity: 0, y: 10, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10"
        >
        <div className="px-3 py-2 rounded-xl bg-black/30 backdrop-blur-md border border-white/15 text-white/90 text-xs md:text-sm shadow-lg">
            <div className="font-semibold">2/9/1945 – Ba Đình, Hà Nội</div>
            <div className="opacity-80">Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập</div>
        </div>
        </motion.div>

    </section>
  );
}