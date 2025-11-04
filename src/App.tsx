import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnimatedBackground from "./components/AnimatedBackground";
import CinematicIntro from "./components/CinematicIntro";
import ReadingProgressBar from "./components/ReadingProgressBar";
import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import Article from "./pages/Article";
import Quiz from "./pages/Quiz";
import Feedback from "./pages/Feedback";
import Chat from "./pages/Chat";
import About from "./pages/About";
import "./components/globals.css";
import "./i18n/i18n";

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith("/chat");
  const [showIntro, setShowIntro] = React.useState(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    return !hasSeenIntro;
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  React.useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title =
      i18n.language === "vi" ? "VNR202 - Lịch sử Đảng Cộng sản Việt Nam" : "VNR202 - History of the Communist Party of Vietnam";
  }, [i18n.language]);

  return (
    <>
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      <div
        className={[
          "flex flex-col min-h-screen bg-parchment-100 dark:bg-brown-900 text-deeptext-900 dark:text-parchment-50",
          isChatRoute ? "overflow-hidden" : "",
        ].join(" ")}
      >
        <ReadingProgressBar />
        <AnimatedBackground />
        <ScrollToTop />
        <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className={["flex-1 pt-16 md:pt-20", isChatRoute ? "overflow-hidden" : ""].join(" ")}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/chapters/:slug" element={<Chapters />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {!isChatRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
