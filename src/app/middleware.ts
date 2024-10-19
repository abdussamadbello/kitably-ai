// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // Redirect to your login page
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Specify protected routes
};
