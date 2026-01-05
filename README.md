<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# 🛡️ CryptoLearn

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

**CryptoLearn Lab** adalah studio kriptografi interaktif yang dirancang untuk mempelajari, memvisualisasikan, dan mempraktikkan algoritma enkripsi klasik dengan antarmuka modern yang futuristik.

---

## ✨ Fitur Unggulan

- 🔐 **Algoritma Kriptografi Klasik**: Implementasi presisi untuk Shift Cipher (Caesar), Vigenère, dan Columnar Transposition.
- 🎨 **Antarmuka Futuristik**: Desain elegan berbasis tema **Rose Pine Moon** dan **One Half Light** dengan mode gelap/terang yang halus.
- 📜 **Log Aktivitas Real-time**: Terminal riwayat terenkripsi untuk melacak setiap operasi yang dilakukan.
- 🛡️ **Autentikasi Aman**: Dilengkapi dengan sistem login menggunakan NextAuth.js.
- ⚡ **Performa Tinggi**: Dibangun di atas Next.js 15 App Router untuk kecepatan maksimal.

---

## 🛠️ Stack Teknologi

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan [MagicUI](https://magicui.design/)
- **Database**: PostgreSQL (via [Neon.tech](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: [Auth.js (NextAuth v5)](https://authjs.dev/)
- **Animasi**: [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Memulai (Local Development)

### 1. Clone Repository
```bash
git clone [https://github.com/tester-id/crypto-learn.git]
cd crypto-learn
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file .env di direktori root dan tambahkan yang berikut ini:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/crypto_learn_db?schema=public"
AUTH_SECRET="your-very-long-random-secret"
```

### 4. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
Open http://localhost:3000 in your browser.
```

---

## 📂 Struktur Project
- src/app: App Router logic (Pages, Layouts, Server Actions).
- src/components: Reusable UI components (MagicUI, Shadcn/UI).
- src/lib: Encryption utilities and Prisma configuration.
- prisma/: Database schema and migrations.

---

## 🤝 Contribution
Contributions are welcome! Feel free to fork this project and submit a pull request for any feature additions or bug fixes.

---

## 📄 License
Distributed under the MIT License. See LICENSE for more information.

<p align="center"> Built with 💜 by <a href="https://github.com/tester-id/">tester-id</a> </p>