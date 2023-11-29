import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, account, }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.apiToken = token.id_token;

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
