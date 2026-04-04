import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("experiencia_theme");
    // Default to light mode if no preference saved
    return saved === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("experiencia_theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-9 h-9 rounded-xl bg-muted hover:bg-secondary flex items-center justify-center transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 180 : 0, scale: [1, 0.8, 1] }}
        transition={{ duration: 0.3 }}
      >
        {dark ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
