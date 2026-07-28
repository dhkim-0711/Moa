import { isAuthorized, loginResponse, logoutResponse } from "../../../lib/auth";

export async function GET(request: Request) {
  return Response.json({ authenticated: await isAuthorized(request) });
}

export async function POST(request: Request) {
  const { code } = await request.json() as { code?: string };
  return loginResponse(String(code || ""));
}

export async function DELETE() {
  return logoutResponse();
}
