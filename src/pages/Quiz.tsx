import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CircleCheck as CheckCircle, Circle as XCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import chaptersData from '../data/chapters.json';
import quizzesData from '../data/quizzes.json';

export default function Quiz() {
  const { t, i18n } = useTranslation();
  const isVietnamese = i18n.language === 'vi';
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const getQuizzesForChapter = (chapterId: number) => {
    const chapterKey = `chapter${chapterId}` as keyof typeof quizzesData;
    return quizzesData[chapterKey] || [];
  };

  const handleChapterSelect = (chapterId: number) => {
    setSelectedChapter(chapterId);
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleQuizSelect = (quiz: any) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    selectedQuiz.questions.forEach((question: any) => {
      if (answers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const backToChapters = () => {
    setSelectedChapter(null);
    setSelectedQuiz(null);
    resetQuiz();
  };

  /* =========================
     QUIZ SELECTION VIEW
     ========================= */
  if (!selectedChapter) {
    return (
      <div className="relative min-h-screen pt-20 overflow-hidden">
        {/* Nền heroistic (đồng bộ đỏ/vàng) */}
        <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-900/35 via-gold-700/20 to-black/60" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
        <motion.div
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
          animate={{ x: ['0%', '180%'] }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-100 to-pink-100 bg-clip-text text-transparent mb-4">
              {t('quiz.title')}
            </h1>
            <p className="text-white/85 text-lg max-w-2xl mx-auto">
              Kiểm tra kiến thức của bạn về Lịch sử Đảng Cộng sản Việt Nam
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {chaptersData.map((chapter, index) => {
              const quizzes = getQuizzesForChapter(chapter.id);
              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => handleChapterSelect(chapter.id)}
                  className="cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-[0_15px_45px_rgba(0,0,0,0.28)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={chapter.thumbnail}
                      alt={isVietnamese ? chapter.title : chapter.titleEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white/90 text-sm font-medium">
                        {quizzes.length} bài kiểm tra
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {isVietnamese ? chapter.title : chapter.titleEn}
                    </h3>
                    <p className="text-white/80">
                      {isVietnamese ? chapter.description : chapter.descriptionEn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     QUIZ LIST VIEW
     ========================= */
  if (selectedChapter && !selectedQuiz) {
    const quizzes = getQuizzesForChapter(selectedChapter);
    const chapter = chaptersData.find(c => c.id === selectedChapter);

    return (
      <div className="relative min-h-screen pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-900/35 via-gold-700/20 to-black/60" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
        <motion.div
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
          animate={{ x: ['0%', '180%'] }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={backToChapters}
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
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {chapter && (isVietnamese ? chapter.title : chapter.titleEn)}
            </h1>
            <p className="text-white/85 text-lg">Chọn bài kiểm tra để bắt đầu</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => handleQuizSelect(quiz)}
                className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 cursor-pointer shadow-[0_15px_45px_rgba(0,0,0,0.28)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {isVietnamese ? quiz.title : quiz.titleEn}
                </h3>
                <p className="text-white/85 mb-4">
                  {isVietnamese ? quiz.description : quiz.descriptionEn}
                </p>
                <div className="text-sm text-white/70">
                  {quiz.questions.length} câu hỏi
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     QUIZ TAKING VIEW
     ========================= */
  if (selectedQuiz && !showResults) {
    const question = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="relative min-h-screen pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-900/35 via-gold-700/20 to-black/60" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
        <motion.div
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
          animate={{ x: ['0%', '180%'] }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
          {/* Progress Bar */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 mb-8 shadow-[0_15px_45px_rgba(0,0,0,0.28)]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                {isVietnamese ? selectedQuiz.title : selectedQuiz.titleEn}
              </h2>
              <span className="text-sm text-white/80">
                {t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {selectedQuiz.questions.length}
              </span>
            </div>
            <div className="w-full rounded-full h-2 bg-white/10">
              <motion.div
                className="h-2 rounded-full"
                style={{
                  background: 'linear-gradient(90deg,#eab308 0%, #ffe8a3 50%, #ffffff 100%)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-8 shadow-[0_15px_45px_rgba(0,0,0,0.28)]"
            >
              <h3 className="text-2xl font-bold text-white mb-8">
                {isVietnamese ? question.question : question.questionEn}
              </h3>

              <div className="space-y-4">
                {question.options.map((option: string, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerSelect(question.id, index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      answers[question.id] === index
                        ? 'border-transparent text-white'
                        : 'border-white/15 hover:border-white/30 text-white'
                    }`}
                    style={
                      answers[question.id] === index
                        ? { background: 'linear-gradient(90deg,rgba(239,68,68,.18),rgba(234,179,8,.18),rgba(239,68,68,.18))' }
                        : { background: 'rgba(255,255,255,0.06)' }
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[question.id] === index ? 'border-transparent' : 'border-white/30'
                        }`}
                        style={
                      answers[question.id] === index
                        ? { background: 'linear-gradient(90deg,#eab308,#ffe8a3,#ffffff)' }
                            : {}
                        }
                      >
                        {answers[question.id] === index && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-white">
                        {isVietnamese ? option : question.optionsEn[index]}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{ background: 'rgba(255,255,255,0.10)' }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>{t('quiz.previous')}</span>
                </button>

                {currentQuestion === selectedQuiz.questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length !== selectedQuiz.questions.length}
                    className="px-6 py-2 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ background: 'linear-gradient(90deg,#16a34a,#22c55e)' }}
                  >
                    {t('quiz.submit')}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={answers[question.id] === undefined}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ background: 'linear-gradient(90deg,#eab308 0%, #ffe8a3 50%, #ffffff 100%)' }}
                  >
                    <span>{t('quiz.next')}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  /* =========================
     RESULTS VIEW
     ========================= */
  if (showResults) {
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    const isPassed = percentage >= 60;

    return (
      <div className="relative min-h-screen pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-900/35 via-gold-700/20 to-black/60" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
        <motion.div
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
          animate={{ x: ['0%', '180%'] }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-8 mb-8 text-center text-white shadow-[0_15px_45px_rgba(0,0,0,0.28)]"
          >
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              isPassed ? 'bg-green-500/15' : 'bg-red-500/15'
            }`}>
              {isPassed ? (
                <CheckCircle className="h-12 w-12 text-green-400" />
              ) : (
                <XCircle className="h-12 w-12 text-red-400" />
              )}
            </div>

            <h2 className="text-3xl font-bold mb-4">
              {t('quiz.score')}: {score}/{selectedQuiz.questions.length}
            </h2>
            <div className="text-6xl font-extrabold mb-4"
                 style={{ background: isPassed ? 'linear-gradient(90deg,#16a34a,#22c55e)' : 'linear-gradient(90deg,#eab308,#ffe8a3)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {percentage}%
            </div>
            <p className="text-white/85">
              {isPassed ? 'Xuất sắc! Bạn đã hoàn thành tốt bài kiểm tra.' : 'Hãy ôn tập thêm và thử lại!'}
            </p>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                style={{ background: 'linear-gradient(90deg,#eab308,#ffe8a3)' }}
              >
                <RotateCcw className="h-4 w-4" />
                <span>{t('quiz.tryAgain')}</span>
              </button>
              <button
                onClick={backToChapters}
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
                style={{ background: 'rgba(255,255,255,0.10)' }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{t('quiz.backToChapters')}</span>
              </button>
            </div>
          </motion.div>

          {/* Detail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Chi tiết kết quả
            </h3>

            {selectedQuiz.questions.map((question: any, index: number) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct;

              return (
                <div key={question.id} className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 text-white shadow-[0_12px_36px_rgba(0,0,0,0.28)]">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? 'bg-green-500/15' : 'bg-red-500/15'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-3">
                        {t('quiz.question')} {index + 1}: {isVietnamese ? question.question : question.questionEn}
                      </h4>

                      <div className="space-y-2 mb-4">
                        {question.options.map((option: string, optionIndex: number) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              optionIndex === question.correct
                                ? 'border-green-400/60 text-green-200'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'border-red-400/60 text-red-200'
                                : 'border-white/15 text-white/85'
                            }`}
                            style={
                              optionIndex === question.correct
                                ? { background: 'linear-gradient(90deg,rgba(34,197,94,.18),rgba(16,185,129,.18))' }
                                : optionIndex === userAnswer && !isCorrect
                                ? { background: 'linear-gradient(90deg,rgba(239,68,68,.18),rgba(234,179,8,.18))' }
                                : { background: 'rgba(255,255,255,0.06)' }
                            }
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <span>{isVietnamese ? option : question.optionsEn[optionIndex]}</span>
                              {optionIndex === question.correct && (
                                <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                              )}
                              {optionIndex === userAnswer && !isCorrect && (
                                <XCircle className="h-4 w-4 text-red-400 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg p-4"
                           style={{ background: 'linear-gradient(90deg,rgba(239,68,68,.14),rgba(234,179,8,.14))', border: '1px solid rgba(255,255,255,0.15)' }}>
                        <h5 className="font-semibold text-white mb-2">
                          {t('quiz.explanation')}:
                        </h5>
                        <p className="text-white/85">
                          {isVietnamese ? question.explanation : question.explanationEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
}
