"use client";
import { SessionProvider, useSession } from "next-auth/react";
import "./globals.css";
import { FC, ReactNode } from "react";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { Header } from "@/components/molecules/Header";
import { Provider as ReduxStoreProvider } from 'react-redux'
import { store } from "@/redux/store";

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

  return (
    <ReduxStoreProvider store={store}>
      <html lang="es">
        <body>
          <Header />
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            {session.status === "loading" && <LoadingSpinner />}
            {session.status === "authenticated" && children}
          </main>
        </body>
      </html>
    </ReduxStoreProvider>
  );
};
