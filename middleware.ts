import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/repo"],
};

export function middleware(request: NextRequest) {
  const simulatedUserCookie = request.cookies.get("simulated-user");

  if (!simulatedUserCookie && request.nextUrl.pathname !== "/signup") {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}
