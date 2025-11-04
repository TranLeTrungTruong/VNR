import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import ReadingProgressBar from '../components/ReadingProgressBar';
import TextToSpeech from '../components/TextToSpeech';
import articlesData from '../data/articles.json';
import chaptersData from '../data/chapters.json';

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isVietnamese = i18n.language === 'vi';
  const [article, setArticle] = useState<any>(null);
  const [chapter, setChapter] = useState<any>(null);

  useEffect(() => {
    const foundArticle = articlesData.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
      const foundChapter = chaptersData.find(c => c.id === foundArticle.chapterId);
      setChapter(foundChapter);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Bài viết không tìm thấy
          </h2>
          <Link
            to="/chapters"
            className="inline-flex items-center gap-2 font-semibold text-white px-4 py-2 rounded-lg"
            style={{ background: 'linear-gradient(90deg,#eab308,#ffe8a3,#ffffff)' }}
            title="Trở về"
            aria-label="Trở về"
          >
            <ArrowLeft className="h-5 w-5 text-white/90" />
          </Link>
        </div>
      </div>
    );
  }

  const content = isVietnamese ? article.content : article.contentEn;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ReadingProgressBar />

      {/* Nền: gradient + vignette + light sweep (đồng bộ đỏ/vàng) */}
      <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-900/35 via-gold-700/20 to-black/60" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
        animate={{ x: ['0%', '180%'] }}
        transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
      />

      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
          <Link
            to="/chapters"
            className="inline-flex items-center gap-2 font-semibold"
              style={{
                background: 'linear-gradient(90deg,#eab308 0%, #ffe8a3 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            title="Trở về"
            aria-label="Trở về"
            >
            <ArrowLeft className="h-5 w-5 text-white/90" aria-hidden />
            </Link>
          </motion.div>

          {/* Article Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_15px_45px_rgba(0,0,0,0.28)] overflow-hidden mb-8"
          >
            {/* Header image */}
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={article.thumbnail}
                alt={isVietnamese ? article.title : article.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                {chapter && (
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 border"
                    style={{
                      color: '#fff',
                      borderColor: 'rgba(255,255,255,0.35)',
                      background: 'rgba(0,0,0,0.35)',
                      backdropFilter: 'blur(6px)',
                    }}
                  >
                    {isVietnamese ? chapter.title : chapter.titleEn}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">
                  {isVietnamese ? article.title : article.titleEn}
                </h1>
              </div>
            </div>

            {/* Meta + TTS */}
            <div className="p-6 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/85">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-white/80" />
                  <span>{t('article.by')} {article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-white/80" />
                  <span>
                    {new Date(article.createdAt).toLocaleDateString(isVietnamese ? 'vi-VN' : 'en-US')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-white/80" />
                  <span>{isVietnamese ? article.readTime : article.readTimeEn}</span>
                </div>
              </div>

              <div className="mt-4">
                <TextToSpeech text={content} />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-white mb-4 mt-8 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-white mb-3 mt-6">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-white/85 mb-4 leading-relaxed text-lg">
                        {children}
                      </p>
                    ),
                    img: ({ src, alt }) => (
                      <div className="my-8">
                        <img
                          src={src as string}
                          alt={alt as string}
                          className="w-full rounded-lg shadow-lg"
                          loading="lazy"
                        />
                        {alt && (
                          <p className="text-center text-sm text-white/70 mt-2 italic">
                            {alt}
                          </p>
                        )}
                      </div>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-white/85">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-white/85">
                        {children}
                      </ol>
                    ),
                    blockquote: ({ children }) => (
                    <blockquote
                      className="pl-6 py-3 my-6 rounded-lg text-white/90"
                      style={{
                        borderLeft: '4px solid transparent',
                        background:
                          'linear-gradient(90deg, rgba(239,68,68,.12), rgba(234,179,8,.12), rgba(239,68,68,.12))',
                        boxShadow: 'inset 4px 0 0 #ef4444',
                      }}
                    >
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {content}
                </ReactMarkdown>
              </motion.div>

              {/* Tags */}
              {article.tags && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Từ khóa
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm font-medium border"
                        style={{
                          color: 'white',
                          borderColor: 'rgba(255,255,255,0.25)',
                          background:
                            'linear-gradient(90deg, rgba(239,68,68,.15), rgba(234,179,8,.15), rgba(239,68,68,.15))',
                          backdropFilter: 'blur(4px)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
