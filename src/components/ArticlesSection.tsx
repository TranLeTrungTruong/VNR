// components/ArticlesSection.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import articlesData from "../data/articles.json";
import { useRef } from "react";

export default function ArticlesSection() {
  const { t, i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";
  const latestArticles = articlesData.slice(0, 3);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

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
          <motion.h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-100 to-pink-100 bg-clip-text text-transparent mb-4 drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
            {t("home.articles.title")}
          </motion.h2>
          <motion.p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto">
            {t("home.articles.subtitle")}
          </motion.p>
        </motion.div>

        {/* Lưới bài viết */}
        <motion.div style={{ scale }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="block"
            >
            <motion.article
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.15, type: "spring", stiffness: 80 }}
              whileHover={{
                y: -16,
                scale: 1.05,
                rotateY: 5,
                rotateX: -5,
                z: 50,
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
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.4 }}
              />

              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(90deg, #eab308, #ffe8a3, #ffffff)",
                  filter: "blur(10px)",
                  zIndex: -1
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Ảnh bìa */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={isVietnamese ? article.title : article.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

                {/* Read time badge */}
                <motion.div
                  className="absolute top-4 right-4 bg-black/35 text-white/90 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 shadow-md"
                  whileHover={{ scale: 1 }}
                >
                  <span className="text-xs font-medium">
                    {isVietnamese ? article.readTime : article.readTimeEn}
                  </span>
                </motion.div>
              </div>

              {/* Nội dung */}
              <div className="relative p-6">
                <motion.h3
                  className="text-xl font-bold text-white mb-3 line-clamp-2 tracking-tight group-hover:text-amber-200 transition-colors duration-300"
                >
                  {isVietnamese ? article.title : article.titleEn}
                </motion.h3>

                <p className="text-white/85 mb-4 line-clamp-3 leading-relaxed">
                  {isVietnamese ? article.excerpt : article.excerptEn}
                </p>

                {/* CTA đọc thêm: gradient chữ đỏ→vàng→đỏ */}
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
                    <span>{t("home.articles.readMore")}</span>
                    <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </div>
            </motion.article>
            </Link>
          ))}
        </motion.div>

        {/* Parallax decorative elements */}
        <motion.div
          style={{ rotate }}
          className="absolute top-10 right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
        />
      </motion.div>
    </section>
  );
}
