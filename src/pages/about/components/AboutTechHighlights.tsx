import { motion } from "framer-motion";
import { Bot, Brain, Calendar, Code, Database, Loader as Loader2, Server } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { SystemInfo } from "../../../utils/systemInfo";

interface AboutTechHighlightsProps {
  loading: boolean;
  systemInfo: SystemInfo | null;
}

export function AboutTechHighlights({ loading, systemInfo }: AboutTechHighlightsProps) {
  const { i18n } = useTranslation();
  const isVietnamese = i18n.language === "vi";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-lg p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-revolutionary-600 to-gold-500 rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isVietnamese ? "Công cụ AI của chúng tôi" : "Our AI Tools"}
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : systemInfo ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <Bot className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">
                  {isVietnamese ? "Mô hình AI hiện tại" : "Current AI Model"}
                </p>
                <p className="text-sm text-white/80">{systemInfo.groqModel}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <Code className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">Bolt New</p>
                <p className="text-sm text-white/80">v{systemInfo.boltVersion}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <Database className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">
                  {isVietnamese ? "Công cụ hoạt động" : "Active Tools"}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {systemInfo.activeTools.map((tool: string) => (
                    <span
                      key={tool}
                      className="px-2 py-1 text-xs font-medium bg-white/20 text-white rounded-lg border border-white/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 shadow-lg p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-revolutionary-600 to-gold-500 rounded-xl">
            <Server className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isVietnamese ? "Thông tin hệ thống" : "System Information"}
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : systemInfo ? (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <Database className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">Supabase</p>
                <p className="text-sm text-white/80">v{systemInfo.supabaseVersion}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <Code className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">React</p>
                <p className="text-sm text-white/80">v{systemInfo.reactVersion}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <Code className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">Vite</p>
                <p className="text-sm text-white/80">v{systemInfo.viteVersion}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-400/30">
              <Calendar className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-white mb-1">
                  {isVietnamese ? "Trạng thái Server" : "Server Status"}
                </p>
                <p className="text-sm text-green-300 font-medium">{systemInfo.serverStatus}</p>
              </div>
            </div>
          </div>
        ) : null}
      </motion.section>
    </div>
  );
}
