import NextAuth, { AuthOptions } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

const {
  AUTH_KEYCLOAK_ID,
  AUTH_KEYCLOAK_SECRET,
  NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER,
} = process.env;

export const authOptions: AuthOptions = {
  providers: [
    Keycloak({
      clientId: AUTH_KEYCLOAK_ID as string,
      clientSecret: AUTH_KEYCLOAK_SECRET as string,
      issuer: NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session) {
        // @ts-expect-error we add the id to the user object
        session.user.id = token.sub
      }
      return session
    }

  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
