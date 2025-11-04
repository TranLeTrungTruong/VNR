import { motion } from "framer-motion";
import { BookOpen, Facebook, Mail, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  // ====== Data Config ======
  const socials = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/thanhKha2606",
      label: "Facebook",
    },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Mail, href: "mailto:huyhanhoppo@gmail.com", label: "Email" },
  ];

  const siteLinks = [
    { label: t("navigation.home"), href: "/" },
    { label: t("navigation.chapters"), href: "/chapters" },
    { label: t("navigation.quiz"), href: "/quiz" },
    { label: t("navigation.chat"), href: "/chat" },
    { label: t("navigation.about"), href: "/about" },
    { label: t("navigation.feedback"), href: "/feedback" },
  ];

  const supportLinks = [
    { label: t("footer.contact"), href: "#" },
    { label: t("footer.privacy"), href: "#" },
    { label: t("footer.terms"), href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Nền mới: đỏ/gold tối dịu để đồng bộ tổng thể */}
      <div className="absolute inset-0 bg-gradient-to-br from-revolutionary-900/40 via-black/40 to-brown-900/40" />
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_200px_rgba(0,0,0,0.55)]" />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 -left-1/3 w-1/4 bg-white/5 blur-3xl"
        animate={{ x: ["0%", "180%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* === Top Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 shadow-lg">
                <BookOpen className="h-7 w-7 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-80" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-white via-amber-100 to-slate-100 bg-clip-text text-transparent">
                VNR202
              </span>
            </div>

            <p className="text-sm text-white/80 max-w-md">
              Nền tảng học tập hiện đại về Lịch sử Đảng Cộng sản Việt Nam – từ thành lập đến phát triển và lãnh đạo đất nước.
            </p>

            <div className="flex space-x-4 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/80 hover:text-gold-200 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-5">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("footer.links") ?? "Liên kết"}
            </h3>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group relative inline-flex items-center gap-2 text-white/85 hover:text-amber-200 transition-colors"
                  >
                    <span>{link.label}</span>
                    <span
                      className="h-[2px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #B22222 0%, #eab308 50%, #B22222 100%)",
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-5">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("footer.support") ?? "Hỗ trợ"}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/85 hover:text-amber-200 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* === Bottom === */}
        <div className="mt-12 pt-6 border-t border-white/15 text-center">
          {/* Chip khẩu hiệu nhỏ (đồng bộ hero) */}
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="15"
              viewBox="0 0 512 341"
              className="w-6 h-4"
              aria-label="Quốc kỳ Việt Nam"
            >
              <rect width="512" height="341" fill="#da251d" />
              <polygon
                fill="#ff0"
                points="256,60 273,126 343,126 288,168 305,234 256,192 207,234 224,168 169,126 239,126"
              />
            </svg>
            <span className="text-xs font-medium text-white/90">
              Độc Lập - Tự Do - Hạnh Phúc
            </span>
          </div>

          <p className="text-sm text-white/80">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
