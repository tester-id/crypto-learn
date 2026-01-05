"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({ words, duration = 3000, className }: { words: string[]; duration?: number; className?: string }) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const startAnimation = useCallback(() => {
    const word = words[(words.indexOf(currentWord) + 1) % words.length];
    setCurrentWord(word);
  }, [currentWord, words]);

  useEffect(() => {
    const interval = setInterval(startAnimation, duration);
    return () => clearInterval(interval);
  }, [startAnimation, duration]);

  return (
    <AnimatePresence>
      <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40, x: 40, filter: "blur(8px)", position: "absolute" }} key={currentWord} className={cn("inline-block text-left px-2", className)}>
        {currentWord}
      </motion.span>
    </AnimatePresence>
  );
};