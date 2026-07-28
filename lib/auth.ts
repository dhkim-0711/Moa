import { env } from "cloudflare:workers";

const COOKIE_NAME = "moa_session";

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function sessionValue() {
  return digest(`${env.MOA_ACCESS_CODE}:${env.MOA_SESSION_SECRET}`);
}

export async function isSessionValueAuthorized(value?: string) {
  return Boolean(value) && value === await sessionValue();
}

export async function isAuthorized(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const value = cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  return isSessionValueAuthorized(value);
}

export async function requireAuthorized(request: Request) {
  if (await isAuthorized(request)) return null;
  return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
}

export async function loginResponse(code: string) {
  if (!env.MOA_ACCESS_CODE || code !== env.MOA_ACCESS_CODE) {
    return Response.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }
  const value = await sessionValue();
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": `${COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=2592000` } },
  );
}

export function logoutResponse() {
  return Response.json(
    { ok: true },
    { headers: { "Set-Cookie": `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` } },
  );
}
