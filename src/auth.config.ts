// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      const isDashboard = nextUrl.pathname.startsWith("/encrypt") || 
                          nextUrl.pathname.startsWith("/decrypt") ||
                          nextUrl.pathname.startsWith("/history");

      if (isDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to /login
      } 
      
      // PERBAIKAN DI SINI:
      // Hanya redirect jika user yang login mencoba akses /login atau /register.
      // JANGAN redirect jika user akses "/" (Welcome Page), agar logout tidak loop/404.
      if (isLoggedIn) {
        if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
          return Response.redirect(new URL("/encrypt", nextUrl));
        }
      }
      
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).username = token.username as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;