import { getUserByEmail } from "./action.api";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        const profile = await getUserByEmail(user.email);

        token.avatar = profile.user.avatar;
        token.id = profile.user.id;
        token.mute = false;
        token.deafen = false;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.avatar = token.avatar;
        session.user.id = token.id;
        session.user.mute = token.mute;
        session.user.deafen = token.deafen;
      }

      return session;
    },
    authorized({ auth, request }: any) {
      // console.log("Authorized:", auth);

      const user = auth?.user;
      const isOnHomepage =
        request.nextUrl?.href === process.env.NEXTAUTH_URL + "/";
      const isOnDashboardPage = request.nextUrl?.href.includes("/dashboard");
      const isOnLoginPage = request.nextUrl?.href.includes("/login");
      const isOnRegisterPage = request.nextUrl?.href.includes("/register");

      // Public page
      if (isOnHomepage) return true;

      // Auth user
      if (user && isOnLoginPage) {
        return Response.redirect(
          new URL("/dashboard/friends", request.nextUrl)
        );
      }

      if (user && isOnRegisterPage) {
        return Response.redirect(
          new URL("/dashboard/friends", request.nextUrl)
        );
      }

      // Unauth user
      if (!user && isOnDashboardPage) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      return true;
    },
  },
};
