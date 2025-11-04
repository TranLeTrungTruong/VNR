import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, Star, MessageCircle, ThumbsUp } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Feedback() {
  const { t, i18n } = useTranslation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!supabase) {
      setError("Hệ thống phản hồi đang được cấu hình. Vui lòng thử lại sau.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Lưu feedback vào database
      const { error: insertError } = await supabase.from("feedback").insert([
        {
          rating,
          feedback,
          email: email || null,
          language: i18n.language,
        },
      ]);

      if (insertError) {
        setError("Không thể gửi phản hồi. Vui lòng thử lại sau.");
        console.error(insertError);
        return;
      }

      // Gửi email notification
      try {
        const response = await fetch('/api/send-feedback-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating,
            feedback,
            email: email || null,
            language: i18n.language,
          }),
        });

        if (!response.ok) {
          console.warn('Failed to send email notification, but feedback was saved');
        }
      } catch (notificationError) {
        console.warn('Email notification failed:', notificationError);
        // Không hiển thị lỗi cho user vì feedback đã được lưu thành công
      }

      setSubmitted(true);
    } catch (error) {
      setError("Không thể gửi phản hồi. Vui lòng thử lại sau.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen pt-20 overflow-hidden">
        {/* NỀN: gradient + vignette + light-sweep (chỉ màu, không đổi logic) */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-800/40 via-purple-900/50 to-fuchsia-900/60" />
        <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
        <motion.div
          aria-hidden
          className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
          animate={{ x: ["0%", "180%"] }}
          transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        />

        <div className="relative z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="m-6 w-full max-w-md rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-8 text-center shadow-[0_15px_45px_rgba(0,0,0,0.28)]"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-500/15">
              <ThumbsUp className="h-8 w-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-4">Cảm ơn bạn!</h2>
            <p className="text-white/85 mb-6">
              Phản hồi của bạn đã được gửi thành công. Chúng tôi sẽ sử dụng ý kiến của bạn để cải thiện website.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2 rounded-lg text-white font-semibold transition-all"
              style={{ background: "linear-gradient(90deg,#ef4444 0%, #eab308 50%, #a855f7 100%)" }}
            >
              Gửi phản hồi khác
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-20 overflow-hidden">
      {/* NỀN: gradient + vignette + light-sweep (chỉ màu) */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800/40 via-purple-900/50 to-fuchsia-900/60" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_220px_rgba(0,0,0,0.6)]" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
        animate={{ x: ["0%", "180%"] }}
        transition={{ duration: 16, ease: "linear", repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(135deg,#ef4444,#eab308,#a855f7)" }}
          >
            <MessageCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-100 to-pink-100 bg-clip-text text-transparent mb-4">
            {t("navigation.feedback")}
          </h1>
          <p className="text-white/85 text-lg">
            Chia sẻ ý kiến của bạn để giúp chúng tôi cải thiện trải nghiệm học tập
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-8 shadow-[0_15px_45px_rgba(0,0,0,0.28)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating (chỉ đổi màu) */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Đánh giá tổng thể của bạn về website
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`p-1 transition-colors ${
                      star <= rating ? "text-amber-300" : "text-white/30"
                    }`}
                    aria-label={`rating-${star}`}
                  >
                    <Star className="h-8 w-8 fill-current" />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-white/75 mt-2">
                  {rating === 1 && "Rất không hài lòng"}
                  {rating === 2 && "Không hài lòng"}
                  {rating === 3 && "Trung bình"}
                  {rating === 4 && "Hài lòng"}
                  {rating === 5 && "Rất hài lòng"}
                </p>
              )}
            </div>

            {/* Email (chỉ đổi màu) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                Email của bạn (tùy chọn)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/10 text-white placeholder-white/60
                           focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent"
              />
            </div>

            {/* Feedback (chỉ đổi màu) */}
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-white/90 mb-2">
                Phản hồi chi tiết *
              </label>
              <textarea
                id="feedback"
                rows={6}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Chia sẻ ý kiến của bạn về nội dung, giao diện, tính năng hoặc bất kỳ điều gì bạn muốn cải thiện..."
                required
                className="w-full px-4 py-3 rounded-lg border border-white/15 bg-white/10 text-white placeholder-white/60 resize-none
                           focus:outline-none focus:ring-2 focus:ring-amber-400/60 focus:border-transparent"
              />
            </div>

            {/* Quick options (chỉ đổi màu) */}
            <div>
              <p className="block text-sm font-medium text-white/90 mb-3">
                Hoặc chọn nhanh:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Nội dung rất hữu ích",
                  "Giao diện đẹp và dễ sử dung",
                  "Tính năng quiz rất hay",
                  "Cần thêm nhiều bài viết",
                  "Tốc độ tải trang chậm",
                  "Cần cải thiện mobile",
                ].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setFeedback(feedback ? `${feedback}\n• ${option}` : `• ${option}`)
                    }
                    className="text-left p-3 rounded-lg text-sm transition-colors border border-white/15 bg-white/10 text-white hover:bg-white/15"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!feedback.trim() || rating === 0 || isSubmitting}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ background: "linear-gradient(90deg,#ef4444 0%, #eab308 50%, #a855f7 100%)" }}
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}</span>
            </button>

            {error && <p className="text-sm text-red-300">{error}</p>}
          </form>
        </motion.div>

        {/* Additional Info (chỉ đổi màu) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 text-white shadow-[0_12px_36px_rgba(0,0,0,0.28)]"
        >
          <h3 className="font-semibold text-white mb-3">Các cách khác để liên hệ:</h3>
          <ul className="space-y-2 text-sm text-white/85">
            <li>• Email: anhDiepProMax@gmail.com</li>
            <li>• Điện thoại: 0399189976 </li>
            <li>• Facebook: Ho Chi Minh Ideology Vietnam</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
