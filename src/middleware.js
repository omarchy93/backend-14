import { CheckCookieAuth } from "./app/lib/middlewareUtility";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    return await CheckCookieAuth(req);
  }
}
