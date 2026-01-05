"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const TypewriterEffectSmooth = ({ words, className }: { words: { text: string; className?: string }[]; className?: string }) => {
  const wordsArray = words.map((word) => ({ ...word, text: word.text.split("") }));
  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div className="overflow-hidden" initial={{ width: "0%" }} whileInView={{ width: "fit-content" }} transition={{ duration: 2, ease: "linear" }}>
        <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold" style={{ whiteSpace: "nowrap" }}>
          {wordsArray.map((word, idx) => (
            <span key={`word-${idx}`} className={cn("dark:text-white text-black", word.className)}>
              {word.text.map((char, index) => <span key={`char-${index}`}>{char}</span>)}&nbsp;
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};