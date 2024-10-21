import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  console.log("params", JSON.stringify(request, null, 2));

  return new Response(request.body);
}
