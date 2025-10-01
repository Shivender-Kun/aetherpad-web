import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { API } from "./constants/server";
import CookieHandler from "./lib/utils/server/cookieHandler";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 hours
    updateAge: 60 * 60 * 12, // 12 hours
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const response = await axios.post(API.USER.SIGNIN, credentials, {
            headers: {
              "Content-Type": "application/json",
              "X-Internal-Auth": process.env.PROXY_SECRET_KEY,
            },
          });

          const {
            status,
            data: {
              data: { csrfToken, user },
            },
            headers: { "set-cookie": secretCookies },
          } = response;

          if (status !== 200) return null;

          let _csrf = "";
          if (secretCookies) {
            const csrfMatch = secretCookies[0].match(/_csrf=([^;]+)/);
            _csrf = csrfMatch?.[1] || "";
          }
          const cookieStore = new CookieHandler();
          await cookieStore.set({ name: "csrf_token", value: csrfToken });
          await cookieStore.set({ name: "_csrf", value: _csrf });

          return {
            id: String(user._id),
            email: user.email,
            username: user.username,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).id;
        token.username = (user as any).username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.userId as string;
        (session.user as any).username = token.username as string;
      }
      return session;
    },
  },

  pages: {
    // signIn: "/signin",
  },
});
