import { motion } from "framer-motion";
import { BookOpen, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigation = [
    { name: t("navigation.home"), href: "/" },
    { name: t("navigation.chapters"), href: "/chapters" },
    { name: t("navigation.quiz"), href: "/quiz" },
    { name: t("navigation.chat"), href: "/chat" },
    { name: t("navigation.about"), href: "/about" },
    { name: t("navigation.feedback"), href: "/feedback" },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setShowLangMenu(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "backdrop-blur-md border-b transition-all duration-300",
        // Nền & viền theo palette đỏ/vàng đồng bộ
        scrolled
          ? "bg-black/30 border-white/15 shadow-lg"
          : "bg-gradient-to-r from-revolutionary-900/40 via-black/40 to-revolutionary-900/40 border-white/10",
      ].join(" ")}
      style={{ willChange: "backdrop-filter, background-color, box-shadow" }}
    >
      {/* Light sweep rất nhẹ (chỉ khi ở top) */}
      {!scrolled && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/5 bg-white/5 blur-2xl"
          animate={{ x: ["0%", "180%"] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        />
      )}

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-revolutionary-600 to-gold-500 shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300 group-hover:scale-105">
              <BookOpen className="h-7 w-7 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-white via-amber-100 to-slate-100 bg-clip-text text-transparent">
                VNR202
              </h1>
              <p className="text-xs text-white/80">Lịch sử Đảng Cộng sản Việt Nam</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={[
                    "group relative px-2 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-amber-300"
                      : "text-white/90 hover:text-amber-200",
                  ].join(" ")}
                >
                  <span className="relative">
                    {item.name}
                    {/* underline gradient */}
                    <span
                      className={[
                        "absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      ].join(" ")}
                       style={{
                        background:
                          "linear-gradient(90deg, #B22222 0%, #eab308 50%, #B22222 100%)",
                       }}
                    />
                  </span>
                </Link>
              );
            })}

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-white/10 text-white/90 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors flex items-center space-x-1 text-white/90"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {i18n.language.toUpperCase()}
                  </span>
                </button>

                {showLangMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 mt-2 w-24 rounded-md shadow-lg border border-white/15 bg-black/40 backdrop-blur-md overflow-hidden"
                  >
                    <button
                      onClick={() => changeLanguage("vi")}
                      className="block w-full px-3 py-2 text-sm text-left text-white/90 hover:bg-white/10"
                    >
                      VI
                    </button>
                    <button
                      onClick={() => changeLanguage("en")}
                      className="block w-full px-3 py-2 text-sm text-left text-white/90 hover:bg-white/10"
                    >
                      EN
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white/90 hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div
              className="px-2 pt-2 pb-3 space-y-1 border-t border-white/10 rounded-b-xl overflow-hidden \
                            bg-gradient-to-br from-revolutionary-900/30 via-black/30 to-revolutionary-900/30 backdrop-blur-md"
            >
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={[
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                      active
                        ? "text-amber-300 bg-white/10"
                        : "text-white/90 hover:text-amber-200 hover:bg-white/5",
                    ].join(" ")}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="flex items-center justify-between px-3 py-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-white/90 hover:bg-white/10"
                >
                  {isDark ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={() => changeLanguage("vi")}
                    className={`px-2 py-1 rounded text-sm ${
                      i18n.language === "vi"
                        ? "bg-amber-400 text-black"
                        : "bg-white/10 text-white/90"
                    }`}
                  >
                    VI
                  </button>
                  <button
                    onClick={() => changeLanguage("en")}
                    className={`px-2 py-1 rounded text-sm ${
                      i18n.language === "en"
                        ? "bg-amber-400 text-black"
                        : "bg-white/10 text-white/90"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
