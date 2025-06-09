"use client";
import { SessionProvider, useSession } from "next-auth/react";
import "./globals.css";
import { FC, ReactNode } from "react";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { Header } from "@/components/molecules/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ContentWrapper>{children}</ContentWrapper>
    </SessionProvider>
  );
}

const ContentWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const session = useSession();
  console.log(session);
  return (
    <html lang="es">
      <body>
        <Header />
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            {session.status === "loading" && <LoadingSpinner />}
            {session.status === "authenticated" && children}
          </main>
        </div>
      </body>
    </html>
  );
};
