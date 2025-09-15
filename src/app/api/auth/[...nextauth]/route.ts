import NextAuth, { AuthOptions } from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import { query } from '@/db/connector'

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
    },
    async signIn({ user }) {
      try {
        if (user) {
          const user_uuidResponse: [{ user_uuid: string }] | [] = await query("SELECT user_uuid FROM user WHERE user_uuid = ?", [user.id])
          if (!user_uuidResponse[0]) {
            await query('INSERT INTO user (user_uuid) VALUES (?)', [user.id])
          }
          const userLarderResponse: [{ id: string }] | [] = await query('SELECT id FROM user_larder WHERE user_uuid = ?', [user.id])
          if (!userLarderResponse[0]) {
            await query('INSERT INTO user_larder (id, user_uuid) VALUES (?, ?)', [null, user.id])
          }
        }
      } catch (error) {
        console.log(error)
      }
      return true
    }
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
