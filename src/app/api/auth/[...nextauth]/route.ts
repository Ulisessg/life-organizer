import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

const {
  AUTH_KEYCLOAK_ID,
  AUTH_KEYCLOAK_SECRET,
  NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER,
} = process.env;

const handler = NextAuth({
  providers: [
    Keycloak({
      clientId: AUTH_KEYCLOAK_ID as string,
      clientSecret: AUTH_KEYCLOAK_SECRET as string,
      issuer: NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER,
    }),
  ],
});

export { handler as GET, handler as POST };
