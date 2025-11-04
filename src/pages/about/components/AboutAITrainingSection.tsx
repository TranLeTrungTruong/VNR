import { motion } from "framer-motion";
import { Code, QrCode, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AboutAITrainingSection() {
  const { t, i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-16"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-lg p-8 md:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">{t("about.aiTraining.title")}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-white/85 text-lg leading-relaxed">
              {t("about.aiTraining.description")}
            </p>

            <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 overflow-x-auto">
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-5 w-5 text-green-400" />
                <span className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                  {isVietnamese ? "Ví dụ lệnh huấn luyện" : "Training Commands"}
                </span>
              </div>
              <pre className="text-sm text-green-300 font-mono leading-relaxed">
                <code>{t("about.aiTraining.codeExample")}</code>
              </pre>
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-500/10 backdrop-blur-sm rounded-xl border border-amber-400/30">
              <Sparkles className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-white/85 leading-relaxed">{t("about.aiTraining.note")}</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 p-8 text-center space-y-6 w-full max-w-sm">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-revolutionary-600 to-gold-500 rounded-xl">
                <QrCode className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white">{t("about.aiTraining.qrTitle")}</h3>

              <div className="relative aspect-square w-full bg-white rounded-xl p-4 flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent('https://vnr202-psi.vercel.app/')}`}
                  alt="QR Code"
                  className="h-full w-auto object-contain"
                />
              </div>

              <p className="text-sm text-white/70">
                {isVietnamese
                  ? "Quét mã QR để truy cập trang web của chúng tôi trên thiết bị di động"
                  : "Scan the QR code to access our website on your mobile device"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
