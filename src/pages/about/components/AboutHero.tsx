import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AboutHero() {
  const { i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";

  return (
    <div className="text-center mb-16">
      <motion.div
        className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-amber-600 to-amber-400 rounded-2xl shadow-xl mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <BookOpen className="h-12 w-12 text-white" />
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-amber-100 to-pink-100 bg-clip-text text-transparent mb-4">
        {isVietnamese ? "Giới thiệu" : "About Us"}
      </h1>
      <p className="text-lg text-white/85 max-w-3xl mx-auto">
        {isVietnamese
          ? "Gặp gỡ đội ngũ và công nghệ đứng sau dự án"
          : "Meet the team and technology behind the project"}
      </p>
    </div>
  );
}
