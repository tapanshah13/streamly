// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/", "/movies", "/tv-series", "/bookmark"],
// };


// middleware.ts

import { NextResponse } from 'next/server';

export default function middleware(req: Request) {
  // No-op function: does nothing
  return NextResponse.next();
}
