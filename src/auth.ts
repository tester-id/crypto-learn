import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "@/lib/prisma"; // Pastikan path ini benar
import bcrypt from "bcryptjs";

// Schema untuk validasi input login
const LoginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          
          // 1. Cari user di Database berdasarkan username
          const user = await prisma.user.findUnique({
            where: { username },
          });

          // Jika user tidak ada
          if (!user) return null;

          // 2. Bandingkan password input dengan hash di DB
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // Return object user (jangan return password)
            return {
              id: user.id,
              username: user.username,
              email: user.email,
            };
          }
        }
        
        console.log("Login failed: Invalid credentials");
        return null;
      },
    }),
  ],
});