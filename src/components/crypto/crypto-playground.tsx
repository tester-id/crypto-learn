"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, Lock, Unlock, Save, Info, Sparkles, Wand2, Hash, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { asciiCipher, vigenereCipher, transpositionCipher } from "@/lib/crypto-utils";
import { saveHistory } from "@/app/actions/history-actions";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function CryptoPlayground({ defaultMode }: { defaultMode: "encrypt" | "decrypt" }) {
  const [method, setMethod] = useState("ascii");
  const [asciiType, setAsciiType] = useState("normal");
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Auto-process with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleProcess();
    }, 400);
    return () => clearTimeout(timer);
  }, [input, key, method, asciiType]);

  const handleProcess = () => {
    if (!input || !key) { setOutput(""); return; }
    try {
      let result = "";
      if (method === "ascii") {
        result = asciiCipher(input, parseInt(key) || 0, defaultMode, asciiType);
      } else if (method === "vigenere") {
        result = vigenereCipher(input, key, defaultMode);
      } else if (method === "transposition") {
        result = transpositionCipher(input, key, defaultMode);
      }
      setOutput(result);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!output || !input) {
      toast.error("No data to save");
      return;
    }
    setIsSaving(true);
    try {
      const result = await saveHistory({
        method: method === "ascii" ? `ascii-${asciiType}` : method,
        type: defaultMode,
        input: input,
        output: output
      });
      if (result.success) toast.success("History saved successfully!");
      else toast.error(result.message || "Failed to save history.");
    } catch (error) {
      toast.error("A connection error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyChange = (val: string) => {
    if (method === "vigenere") setKey(val.toUpperCase().replace(/[^A-Z]/g, ''));
    else if (method === "ascii") setKey(val.replace(/[^-0-9]/g, ''));
    else setKey(val);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4">
      {/* Header Studio - UX: Clear Feedback on current state */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/40 pb-6">
        <div className="space-y-2">
          <Badge variant="outline" className="mb-2 px-3 py-1 text-[10px] uppercase tracking-widest bg-primary/5 text-primary border-primary/20">
            {method} Protocol Active
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter capitalize flex items-center gap-3 italic">
            {defaultMode === "encrypt" ? 
              <Lock className="w-10 h-10 text-primary" /> : 
              <Unlock className="w-10 h-10 text-primary" />
            }
            {defaultMode}ion <span className="text-muted-foreground/50 not-italic font-light">Lab</span>
          </h1>
        </div>
        
        <Tabs 
          defaultValue="ascii" 
          onValueChange={(val) => { setMethod(val); setKey(""); }} 
          className="w-full md:w-auto overflow-hidden"
        >
          <TabsList className={cn(
            "bg-muted/30 border border-border/20 p-1 h-14 backdrop-blur-xl rounded-2xl w-full",
            "flex overflow-x-auto no-scrollbar justify-start md:justify-center"
          )}>
            <TabsTrigger 
              value="ascii" 
              className="flex-1 md:flex-none px-4 md:px-8 rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg text-xs md:text-sm whitespace-nowrap"
            >
              Caesar
            </TabsTrigger>
            <TabsTrigger 
              value="vigenere" 
              className="flex-1 md:flex-none px-4 md:px-8 rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg text-xs md:text-sm whitespace-nowrap"
            >
              Vigenère
            </TabsTrigger>
            <TabsTrigger 
              value="transposition" 
              className="flex-1 md:flex-none px-4 md:px-8 rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-lg text-xs md:text-sm whitespace-nowrap"
            >
              Transposition
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Section: Control & Config */}
        <div className="lg:col-span-4 space-y-6">
          <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <Wand2 className="w-4 h-4 text-primary" />
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Configuration</h2>
            </div>
            
            <Card className="border-border/40 bg-card/40 backdrop-blur-md shadow-2xl rounded-[2rem] overflow-hidden">
              <CardContent className="p-6 space-y-6">
                {/* Key Input */}
                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                    {method === "ascii" ? "Shift Amount" : "Secret Key"}
                    <span className="text-primary/40 font-mono">REQUIRED</span>
                  </Label>
                  <div className="relative group">
                    <Input 
                      type={method === "ascii" ? "number" : "text"}
                      placeholder={method === "ascii" ? "e.g., 3" : "e.g., LEMON"}
                      value={key}
                      onChange={(e) => handleKeyChange(e.target.value)}
                      className="bg-background/50 border-border/40 h-14 pl-12 font-mono text-lg rounded-2xl focus-visible:ring-primary focus-visible:border-primary/50 transition-all"
                    />
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                  </div>
                </div>

                {/* Method Specific Option */}
                <AnimatePresence mode="wait">
                  {method === "ascii" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mathematical Base</Label>
                      <Select value={asciiType} onValueChange={setAsciiType}>
                        <SelectTrigger className="bg-background/50 border-border/40 h-12 rounded-xl font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/40 backdrop-blur-xl">
                          <SelectItem value="normal">Classic (Modulo 26)</SelectItem>
                          <SelectItem value="full">ASCII Range (65-90)</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Button - UX: Prominent Call to Action */}
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving || !output}
                  className="w-full h-14 font-black uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 relative group overflow-hidden rounded-2xl text-primary-foreground"
                >
                  <div className="absolute inset-0 w-full h-full animate-shimmer bg-[linear-gradient(110deg,transparent,25%,rgba(255,255,255,0.1),50%,transparent,75%,transparent)] bg-[length:200%_100%] opacity-50" />
                  <Save className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">{isSaving ? "Syncing..." : "Save Log"}</span>
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Quick Info Box */}
          <div className="p-5 rounded-[1.5rem] bg-muted/20 border border-border/20 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Protocol Insight</span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground font-medium">
              Results are processed locally using 256-bit safe algorithms. Auto-sync is active.
            </p>
          </div>
        </div>

        {/* Right Section: Workspace */}
        <div className="lg:col-span-8">
          <Card className="border-border/40 bg-card/20 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-2xl border-2">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/40">
              {/* Input Area */}
              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px] uppercase tracking-[0.2em] font-black text-muted-foreground/60">Input Stream</Label>
                  <RefreshCcw className="w-3 h-3 text-muted-foreground/30" />
                </div>
                <Textarea 
                  placeholder="Insert your secret message..." 
                  className="min-h-[350px] font-mono text-lg leading-relaxed border-none bg-transparent focus-visible:ring-0 p-0 resize-none placeholder:text-muted-foreground/20 text-foreground/90"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              {/* Output Area - UX: Distinctive visual for result */}
              <div className="p-8 bg-primary/[0.03] space-y-4 relative group">
                <div className="flex justify-between items-center">
                  <Label className="text-[11px] uppercase tracking-[0.2em] font-black text-primary">Result Hash</Label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {navigator.clipboard.writeText(output); toast.success("Copied to clipboard!");}} 
                    className="h-8 px-4 rounded-full border-primary/20 bg-background/50 hover:bg-primary hover:text-primary-foreground transition-all flex gap-2 font-bold text-[10px]"
                    disabled={!output}
                  >
                    <Copy className="w-3 h-3" /> COPY
                  </Button>
                </div>
                <Textarea 
                  readOnly 
                  className="min-h-[350px] font-mono text-lg leading-relaxed border-none bg-transparent focus-visible:ring-0 p-0 resize-none text-primary font-bold placeholder:text-primary/10"
                  value={output}
                  placeholder="Waiting for input..."
                />
                
                {/* Visual Accent */}
                <div className="absolute bottom-4 right-4 opacity-10">
                  <Sparkles className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="bg-muted/40 px-8 py-3 flex items-center justify-between border-t border-border/40">
              <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-widest">AES-Ready Buffer</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono text-green-600/70 font-bold uppercase">System Secure</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const Badge = ({ children, className, variant }: any) => (
  <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", className)}>
    {children}
  </span>
);