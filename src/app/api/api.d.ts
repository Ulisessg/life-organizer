export interface ApiResponse<T> {
  error: boolean
  data: T
  message: string
}


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getServerSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      name: string
      email: string
    }
  }
}