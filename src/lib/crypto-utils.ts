/**
 * Utility Kriptografi Klasik
 * Fokus pada edukasi dan kejelasan algoritma.
 */

// --- 1. ASCII Cipher ---
// Tambahan logika pada src/lib/crypto-utils.ts
export const asciiCipher = (
  text: string, 
  key: number, 
  mode: "encrypt" | "decrypt", 
  type: string = "normal"
) => {
  const shift = mode === "encrypt" ? key : -key;

  return text.replace(/[a-z]/gi, (char) => {
    const isUpper = char === char.toUpperCase();
    const start = isUpper ? 65 : 97; // A=65 atau a=97
    const end = isUpper ? 90 : 122;   // Z=90 atau z=122
    
    let charCode = char.charCodeAt(0);
    let newCode: number;

    if (type === "normal") {
      // Logika A=0: Indeks 0-25
      newCode = ((charCode - start + shift) % 26);
      if (newCode < 0) newCode += 26;
      return String.fromCharCode(newCode + start);
    } else {
      // Logika A=65 (Terbatas A-Z): 
      // Langsung geser nilai ASCII, tapi bungkus (wrap) jika keluar dari 65-90
      newCode = charCode + (shift % 26); 
      
      if (newCode > end) {
        newCode = start + (newCode - end - 1);
      } else if (newCode < start) {
        newCode = end - (start - newCode - 1);
      }
      
      return String.fromCharCode(newCode);
    }
  });
};

// --- 2. Vigenère Cipher ---
export const vigenereCipher = (text: string, key: string, mode: 'encrypt' | 'decrypt'): string => {
  if (!key) return text;
  
  const result = [];
  let keyIndex = 0;
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, ''); // Validasi Key hanya huruf

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // Hanya proses huruf A-Z, abaikan simbol lain agar mudah dibaca
    if (char.match(/[a-zA-Z]/)) {
      const isUpper = char === char.toUpperCase();
      const base = isUpper ? 65 : 97;
      
      // Ubah char ke range 0-25
      const p = char.charCodeAt(0) - base;
      const k = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      
      let c;
      if (mode === 'encrypt') {
        // Rumus Enkripsi: E = (P + K) mod 26
        c = (p + k) % 26;
      } else {
        // Rumus Dekripsi: D = (C - K + 26) mod 26
        c = (p - k + 26) % 26;
      }
      
      result.push(String.fromCharCode(c + base));
      keyIndex++;
    } else {
      result.push(char);
    }
  }
  return result.join('');
};

// --- 3. Columnar Transposition Cipher ---
export const transpositionCipher = (text: string, key: string, mode: 'encrypt' | 'decrypt'): string => {
    if (!key || !text) return text;

    const colCount = key.length;
    const cleanText = text.replace(/\s/g, '_'); // Ganti spasi dengan underscore agar struktur grid terlihat
    const rowCount = Math.ceil(cleanText.length / colCount);

    // 1. Buat urutan kolom berdasarkan urutan alfabet Key
    // Contoh: APPLE -> A:0, E:4, L:1, P:2, P:3 (berdasarkan urutan alfabet)
    const keyIndices = key.split('').map((char, index) => ({ char, index }));
    const sortedKeyIndices = [...keyIndices].sort((a, b) => a.char.localeCompare(b.char));

    if (mode === 'encrypt') {
        let result = "";
        
        // Baca kolom satu per satu berdasarkan urutan alfabet key
        for (let i = 0; i < colCount; i++) {
            const originalColIndex = sortedKeyIndices[i].index;
            for (let j = 0; j < rowCount; j++) {
                const charIndex = j * colCount + originalColIndex;
                if (charIndex < cleanText.length) {
                    result += cleanText[charIndex];
                }
            }
        }
        return result;
    } else {
        // --- LOGIKA DEKRIPSI ---
        const resultGrid: string[] = new Array(cleanText.length);
        let currentIndex = 0;

        // Hitung berapa banyak karakter yang ada di setiap kolom
        // Penting karena kolom terakhir mungkin tidak penuh (incomplete grid)
        const charsPerCol = new Array(colCount).fill(Math.floor(cleanText.length / colCount));
        const extraChars = cleanText.length % colCount;
        for (let i = 0; i < extraChars; i++) {
            charsPerCol[i]++;
        }

        // Masukkan karakter dari ciphertext kembali ke kolom yang benar
        for (let i = 0; i < colCount; i++) {
            const originalColIndex = sortedKeyIndices[i].index;
            const numCharsInThisCol = charsPerCol[originalColIndex];

            for (let j = 0; j < numCharsInThisCol; j++) {
                const gridPos = j * colCount + originalColIndex;
                resultGrid[gridPos] = text[currentIndex];
                currentIndex++;
            }
        }

        return resultGrid.join('').replace(/_/g, ' '); // Kembalikan underscore jadi spasi
    }
};