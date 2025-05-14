"use client";
import { FC, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { LinkA } from "@/components/atoms/LinkA";
import { ButtonA } from "../atoms/ButtonA";

export const Header: FC = () => {
  const userConsoleURL = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER}/account`;
  }, []);
  const session = useSession();

  return (
    <header className="h-15 border-b-1 flex place-content-between items-center shadow-md">
      <p className="ml-2">Life organizer</p>
      {session.status === "loading" && <LoadingSpinner />}
      {session.status === "unauthenticated" && (
        <ButtonA id="login-btn" onClick={() => signIn()}>
          Login
        </ButtonA>
      )}
      {session.status === "authenticated" && (
        <div className="flex mr-2">
          <LinkA id="profile-link" href={userConsoleURL} className="mr-2">
            Perfil
          </LinkA>
          <ButtonA id="logout-btn" onClick={() => signOut()}>
            Logout
          </ButtonA>
        </div>
      )}
    </header>
  );
};
