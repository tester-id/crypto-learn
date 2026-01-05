"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, Lock, Unlock, Save, Info, Sparkles } from "lucide-react";
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
    <div className="w-full max-w-5xl mx-auto space-y-8 p-2">
      {/* Header Studio */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-extrabold tracking-tighter capitalize flex items-center gap-3">
            {defaultMode === "encrypt" ? 
              <Lock className="w-8 h-8 text-primary animate-pulse" /> : 
              <Unlock className="w-8 h-8 text-primary animate-pulse" />
            }
            {defaultMode}ion Studio
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Classic Cryptography Lab // {method.toUpperCase()} Protocol
          </p>
        </div>
        
        <Tabs defaultValue="ascii" onValueChange={(val) => { setMethod(val); setKey(""); }} className="w-full md:w-auto">
          <TabsList className="bg-muted/50 border border-border/50 p-1 h-12 backdrop-blur-sm">
            <TabsTrigger value="ascii" className="px-6 rounded-md data-[state=active]:bg-background data-[state=active]:text-primary">Shift (Caesar)</TabsTrigger>
            <TabsTrigger value="vigenere" className="px-6 rounded-md data-[state=active]:bg-background data-[state=active]:text-primary">Vigenère</TabsTrigger>
            <TabsTrigger value="transposition" className="px-6 rounded-md data-[state=active]:bg-background data-[state=active]:text-primary">Transposition</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kontrol Panel (Kiri) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Cipher Logic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  {method === "ascii" ? "Shift (Key N)" : "Secret Keyword"}
                  <Info className="w-3 h-3 text-primary/60" />
                </Label>
                <Input 
                  type={method === "ascii" ? "number" : "text"}
                  placeholder={method === "ascii" ? "e.g., 3" : "e.g., LEMON"}
                  value={key}
                  onChange={(e) => handleKeyChange(e.target.value)}
                  className="bg-background/50 border-border/50 h-11 font-mono focus-visible:ring-primary"
                />
              </div>

              <AnimatePresence mode="wait">
                {method === "ascii" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="space-y-3 pt-2 border-t border-border/50"
                  >
                    <Label className="text-xs font-bold uppercase tracking-widest">Mathematical Base</Label>
                    <Select value={asciiType} onValueChange={setAsciiType}>
                      <SelectTrigger className="bg-background/50 border-border/50 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Classic (Modulo 26)</SelectItem>
                        <SelectItem value="full">ASCII Range (A=65 - Z=90)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="p-3 bg-muted/50 rounded-lg text-[10px] text-muted-foreground font-mono leading-tight">
                      {asciiType === "normal" 
                        ? "FORMULA: (p + k) mod 26" 
                        : "FORMULA: (p - 65 + k) mod 26 + 65"}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-4">
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving || !output}
                  className="w-full h-12 font-bold transition-all active:scale-95 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 relative group overflow-hidden rounded-xl text-primary-foreground"
                >
                  <div className="absolute inset-0 w-full h-full animate-shimmer bg-[linear-gradient(110deg,transparent,25%,rgba(255,255,255,0.1),50%,transparent,75%,transparent)] bg-[length:200%_100%]" />
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving Data..." : "Save Result"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Input & Output Panel (Kanan) */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="flex border-b border-border/50">
              <div className="flex-1 p-4 border-r border-border/50">
                <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-primary mb-2 block">Source Message</Label>
                <Textarea 
                  placeholder="Insert your secret text here..." 
                  className="min-h-[250px] font-mono text-[15px] leading-relaxed border-none bg-transparent focus-visible:ring-0 p-0 resize-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="flex-1 p-4 bg-muted/20 relative group">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Generated Result</Label>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {navigator.clipboard.writeText(output); toast.success("Copied to clipboard!");}} 
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={!output}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <Textarea 
                  readOnly 
                  className="min-h-[250px] font-mono text-[15px] leading-relaxed border-none bg-transparent focus-visible:ring-0 p-0 resize-none text-primary/80"
                  value={output}
                  placeholder="Result will appear here..."
                />
              </div>
            </div>
            <div className="p-3 bg-muted/40 text-[10px] font-mono text-center text-muted-foreground uppercase tracking-widest border-t border-border/50">
              End-to-End Encryption Mode: {method} // Standard: 256-bit safe
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}