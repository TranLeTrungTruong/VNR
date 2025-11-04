import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Search, ListFilter as Filter, BookOpen, Clock, ArrowRight } from "lucide-react";
import chaptersData from "../data/chapters.json";
import articlesData from "../data/articles.json";

export default function Chapters() {
  const { t, i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchesSearch =
        searchTerm === "" ||
        (isVietnamese ? article.title : article.titleEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (isVietnamese ? article.excerpt : article.excerptEn)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        article.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesChapter = selectedChapter === null || article.chapterId === selectedChapter;

      return matchesSearch && matchesChapter;
    });
  }, [searchTerm, selectedChapter, isVietnamese]);

  const getChapterTitle = (chapterId: number) => {
    const chapter = chaptersData.find((c) => c.id === chapterId);
    return chapter ? (isVietnamese ? chapter.title : chapter.titleEn) : "";
  };

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* NỀN: gradient đỏ→tím + vignette + light-sweep */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800/40 via-purple-900/50 to-fuchsia-900/60" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
        animate={{ x: ["0%", "180%"] }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-100 to-pink-100 bg-clip-text text-transparent mb-3 drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)]">
            {t("navigation.chapters")}
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto">
            {isVietnamese
              ? `Khám phá các chương học về Lịch sử Đảng Cộng sản Việt Nam – từ thành lập đến lãnh đạo đất nước`
              : `Explore chapters on the History of the Communist Party of Vietnam – from foundation to national leadership`}
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 mb-8 shadow-[0_12px_36px_rgba(0,0,0,0.28)]"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-5 w-5" />
              <input
                type="text"
                placeholder={t("search.placeholder") as string}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/15 bg-white/10 text-white placeholder-white/60
                           focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-white/80 h-5 w-5" />
              <select
                value={selectedChapter ?? ""}
                onChange={(e) => setSelectedChapter(e.target.value ? parseInt(e.target.value) : null)}
                className="px-4 py-3 rounded-lg border border-white/15 bg-white/10 text-white focus:outline-none
                           focus:ring-2 focus:ring-amber-400/60 focus:border-transparent"
              >
                <option value="">{t("search.all")}</option>
                {chaptersData.map((chapter) => (
                  <option key={chapter.id} value={chapter.id} className="text-black">
                    {isVietnamese ? chapter.title : chapter.titleEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Chapters Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {chaptersData.map((chapter) => (
            <motion.button
              type="button"
              key={chapter.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
              className="group text-left rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md
                         shadow-[0_12px_36px_rgba(0,0,0,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={chapter.thumbnail}
                  alt={isVietnamese ? chapter.title : chapter.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/35 backdrop-blur-md px-2.5 py-1">
                  <span className="text-[11px] text-white/90">{chapter.articles} {isVietnamese ? "bài viết" : "articles"}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-white mb-1 text-sm group-hover:text-amber-200 transition-colors">
                  {isVietnamese ? chapter.title : chapter.titleEn}
                </h3>
                <div className="flex items-center text-[12px] text-white/75">
                  <BookOpen className="h-3.5 w-3.5 mr-1" />
                  <span>{isVietnamese ? "Bấm để lọc chương" : "Click to filter"}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="block"
            >
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="group rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md
                         shadow-[0_15px_45px_rgba(0,0,0,0.28)] cursor-pointer"
            >
              {/* Ảnh */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={isVietnamese ? article.title : article.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                {/* Badge chương */}
                <div className="absolute top-4 left-4">
                  <span
                    className="inline-flex items-center rounded-full border border-white/20 bg-black/35 backdrop-blur-md
                               px-2.5 py-1 text-[11px] font-medium text-white/90"
                  >
                    {getChapterTitle(article.chapterId)}
                  </span>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
              </div>

              {/* Nội dung */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                  {isVietnamese ? article.title : article.titleEn}
                </h3>
                <p className="text-white/85 mb-4 line-clamp-3 leading-relaxed">
                  {isVietnamese ? article.excerpt : article.excerptEn}
                </p>

                <div className="flex items-center justify-between text-sm text-white/75 mb-4">
                  <div className="flex items-center gap-4">
                    <span>
                      {t("article.by")} {article.author}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {isVietnamese ? article.readTime : article.readTimeEn}
                    </span>
                  </div>
                </div>

                {article.tags && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/10 text-white/85 px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA đọc thêm: chữ gradient đồng bộ */}
                <div className="inline-flex items-center gap-2 font-semibold"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(239,68,68,1) 0%, rgba(234,179,8,1) 50%, rgba(168,85,247,1) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  <span>{t("home.articles.readMore")}</span>
                  <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <BookOpen className="h-16 w-16 text-white/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Không tìm thấy bài viết</h3>
            <p className="text-white/80">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
