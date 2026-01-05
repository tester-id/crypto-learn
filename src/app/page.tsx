'use client'

import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
import { Github, ArrowRightIcon, ShieldCheck, Code, BookOpen, Sparkles, Fingerprint, Zap } from 'lucide-react'
import { motion } from "framer-motion"

import GridPattern from '@/components/magicui/grid-pattern'
import ShimmerButton from '@/components/magicui/shimmer-button'
import AnimatedShinyText from '@/components/magicui/animated-shiny-text'
import { FlipWords } from '@/components/magicui/flip-words'
import { TypewriterEffectSmooth } from '@/components/magicui/typewriter-effect'
import { cn } from '@/lib/utils'

export function AnimatedShinyBadge() {
    return (
        <div className="z-10 flex items-center justify-center mb-6">
            <div
                className={cn(
                    'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
                )}
            >
                <AnimatedShinyText
                    className={cn(
                        'inline-flex items-center justify-center px-4 py-1.5 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400',
                        'text-sm lg:text-base font-mono tracking-tighter',
                    )}
                >
                    <Sparkles className="mr-2 size-4 text-primary animate-pulse" />
                    <span>v2.0 Encryption Protocol</span>
                    <ArrowRightIcon className="ml-2 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                </AnimatedShinyText>
            </div>
        </div>
    )
}

export default function Home() {
    const typewriterWords = [
        { text: 'Experiment' },
        { text: 'with' },
        { text: 'Digital' },
        { text: 'Security.', className: "text-primary font-bold" },
    ]

    return (
        <div className="bg-background text-foreground min-h-screen flex flex-col selection:bg-primary/30 overflow-x-hidden">
            {/* Header Area */}
            <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tighter">
                      <ShieldCheck className="w-6 h-6" />
                      <span>CryptoLearn</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        {/* <Link href="/login" className="text-sm font-semibold hover:text-primary transition-colors hidden sm:block">
                            Sign In
                        </Link> */}
                        <ModeToggle />
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6">
                    <div className="z-20 w-full max-w-5xl space-y-10 text-center">
                        <AnimatedShinyBadge />
                        
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
                                Master the Art of <br />
                                <FlipWords 
                                    words={['Shift Cipher', 'Caesar Mode', 'Vigenère', 'Transposition']} 
                                    className="text-primary"
                                />
                                <br />
                                <span className="bg-gradient-to-r from-blue-500 via-primary to-purple-500 inline-block text-transparent bg-clip-text pb-2">
                                    Cryptography
                                </span>
                            </h1>
                        </div>

                        <div className="flex justify-center">
                            <TypewriterEffectSmooth 
                                words={typewriterWords} 
                                className="text-muted-foreground font-medium"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-4">
                            <ShimmerButton
                                className="w-full md:w-64 h-14 shadow-2xl shadow-primary/20"
                                background="var(--primary)"
                            >
                                <Link href="/register" className="flex items-center justify-center w-full h-full">
                                    <span className="text-lg font-bold text-primary-foreground">Start Securing</span>
                                    <Zap className="ml-2 w-4 h-4 fill-current" />
                                </Link>
                            </ShimmerButton>
                            
                            <Link href="/login" className="w-full md:w-auto group">
                                <button className="w-full md:w-64 h-14 px-8 rounded-full border border-border/60 bg-background/50 backdrop-blur-sm hover:bg-muted transition-all font-bold flex items-center justify-center gap-2">
                                    Member Login
                                    <Fingerprint className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* MagicUI Background Pattern */}
                    <GridPattern
                    width={60} // Larger cells look cleaner
                    height={60}
                    strokeDasharray="4 4"
                    className={cn(
                        // This mask makes it visible in the center but fades it out towards the edges
                        "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
                    )}
                    />
                    
                    {/* Decorative Background Glows */}
                    {/* 1. Primary Glow (Top Right - Iris/Lavender) */}
                    <div className="absolute right-[-10%] top-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse pointer-events-none"></div>

                    {/* 2. Secondary Glow (Bottom Left - Blue) */}
                    <div className="absolute left-[-5%] bottom-[10%] -z-10 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[130px] pointer-events-none"></div>

                    {/* 3. Center Subtle Glow (Behind Content) */}
                    <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none"></div>

                    {/* 4. Bottom Accent (Rose Pine Love/Pinkish) */}
                    <div className="absolute right-[20%] bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-destructive/10 blur-[110px] pointer-events-none"></div>
                </div>

                {/* Features Section */}
                <section className="max-w-7xl mx-auto px-6 py-32 border-t border-border/40">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Engineered for Education</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A secure sandbox to learn, visualize, and practice classic cryptographic algorithms used throughout history.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
                                title: "Client-Side Privacy",
                                desc: "Secure simulation without risking real-world data. All operations happen locally in your secure session.",
                                color: "bg-blue-500/10"
                            },
                            {
                                icon: <Code className="w-8 h-8 text-primary" />,
                                title: "Real-time Lab",
                                desc: "Instantly test various algorithms with live input/output synchronization and monospaced visual logs.",
                                color: "bg-primary/10"
                            },
                            {
                                icon: <BookOpen className="w-8 h-8 text-purple-500" />,
                                title: "Activity Stream",
                                desc: "Track your learning progress with a comprehensive, encrypted activity log and system history.",
                                color: "bg-purple-500/10"
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[2.5rem] border border-border/40 bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:bg-card/60 transition-all duration-500 group"
                            >
                                <div className={cn("p-5 rounded-2xl mb-6 w-fit transition-transform group-hover:scale-110 duration-500", feature.color)}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-medium">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-16 border-t border-border/40 bg-muted/30">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2 font-bold text-lg text-primary">
                            <ShieldCheck className="w-5 h-5" />
                            <span>CryptoLearn</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">
                            © 2026 CryptoLearn. Built for Security Education.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <a
                            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                            href="https://github.com/tester-id"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github size={18} className="mr-2" />
                            Repository
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}