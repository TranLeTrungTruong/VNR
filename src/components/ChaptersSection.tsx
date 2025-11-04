// components/ChaptersSection.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import chaptersData from "../data/chapters.json";
import { useRef } from "react";
import ParallaxSection from "./ParallaxSection";

export default function ChaptersSection() {
  const { t, i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, when: "beforeChildren", staggerChildren: 0.08 },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Nền đồng bộ Hero/Header: gradient đỏ→vàng + vignette + light sweep */}
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
        {/* Tiêu đề & mô tả */}
        <motion.div className="text-center mb-14">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-100 to-pink-100 bg-clip-text text-transparent mb-4 drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]"
          >
            {t("home.chapters.title")}
          </motion.h2>
          <motion.p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto">
            {t("home.chapters.subtitle")}
          </motion.p>
        </motion.div>

        {/* Lưới chương */}
        <motion.div style={{ opacity }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {chaptersData.map((chapter, index) => (
            <Link key={chapter.id} to={`/chapters/${chapter.slug}`} className="block">
            <motion.article
              initial={{ opacity: 0, y: 50, scale: 0.97, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 + index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{
                y: -12,
                scale: 1.02,
                rotateY: 2,
                rotateX: -2,
                transition: { duration: 0.3 }
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_15px_45px_rgba(0,0,0,0.28)] cursor-pointer"
            >
              {/* Accent gradient khi hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              bg-gradient-to-tr from-red-500/25 via-yellow-500/20 to-red-500/25"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.8 }}
              />

              {/* Ảnh bìa */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={chapter.thumbnail}
                  alt={isVietnamese ? chapter.title : chapter.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                {/* Overlay tối để chữ nổi */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

                {/* Badge số bài viết */}
                <motion.div
                  className="absolute top-4 right-4 bg-black/35 text-white/90 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 shadow-md"
                  whileHover={{ scale: 1 }}
                >
                  <span className="text-xs font-medium">
                    {isVietnamese ? `${chapter.articles} bài viết` : `${chapter.articles} articles`}
                  </span>
                </motion.div>
              </div>

              {/* Nội dung */}
              <div className="relative p-7 md:p-8">
                <motion.h3
                  className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-amber-200 transition-colors duration-300"
                >
                  {isVietnamese ? chapter.title : chapter.titleEn}
                </motion.h3>

                <p className="text-white/85 leading-relaxed mb-6">
                  {isVietnamese ? chapter.description : chapter.descriptionEn}
                </p>

                {/* CTA text (entire card is clickable) */}
                <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <div
                    className="inline-flex items-center gap-2 font-semibold"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(234,179,8,1) 0%, rgba(255,232,163,1) 50%, rgba(255,255,255,1) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <span>{t("home.chapters.explore")}</span>
                    <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>
            </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* Parallax floating elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"
        />
      </motion.div>
    </section>
  );
}
