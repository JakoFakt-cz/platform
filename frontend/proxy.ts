import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isAccessTokenExpired(tokenValue: string): boolean {
  try {
    const parts = tokenValue.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf-8')
    );
    const now = Math.floor(Date.now() / 1000);
    return !payload.exp || payload.exp < now + 60;
  } catch {
    return true;
  }
}

function parseCookieString(
  setCookieStr: string
): { name: string; value: string; options: Record<string, unknown> } | null {
  const parts = setCookieStr.split(';').map((s) => s.trim());
  if (!parts[0]) return null;

  const [nameValue, ...attrs] = parts;
  const eqIndex = nameValue.indexOf('=');
  if (eqIndex === -1) return null;

  const name = nameValue.substring(0, eqIndex);
  const value = nameValue.substring(eqIndex + 1);

  const options: Record<string, unknown> = {};
  for (const attr of attrs) {
    const lower = attr.toLowerCase();
    if (lower.startsWith('path=')) options.path = attr.substring(5);
    else if (lower.startsWith('expires='))
      options.expires = new Date(attr.substring(8));
    else if (lower.startsWith('domain=')) options.domain = attr.substring(7);
    else if (lower.startsWith('max-age='))
      options.maxAge = parseInt(attr.substring(8), 10);
    else if (lower === 'httponly') options.httpOnly = true;
    else if (lower === 'secure') options.secure = true;
    else if (lower.startsWith('samesite='))
      options.sameSite = attr.substring(9).toLowerCase() as
        | 'lax'
        | 'strict'
        | 'none';
  }

  return { name, value, options };
}

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('jako_access_token')?.value;
  const refreshToken = request.cookies.get('jako_refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.next();
  }

  const needsRefresh = !accessToken || isAccessTokenExpired(accessToken);

  if (!needsRefresh) {
    return NextResponse.next();
  }

  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.next();
  }

  try {
    const refreshResponse = await fetch(`${backendUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        Cookie: `jako_refresh_token=${refreshToken}`,
      },
    });

    if (!refreshResponse.ok) {
      const response = NextResponse.next();
      response.cookies.delete('jako_access_token');
      response.cookies.delete('jako_refresh_token');
      return response;
    }

    const setCookieHeaders = refreshResponse.headers.getSetCookie();
    const response = NextResponse.next();

    for (const cookieStr of setCookieHeaders) {
      const parsed = parseCookieString(cookieStr);
      if (!parsed) continue;

      response.cookies.set({
        name: parsed.name,
        value: parsed.value,
        path: (parsed.options.path as string) || '/',
        expires: parsed.options.expires as Date | undefined,
        httpOnly: (parsed.options.httpOnly as boolean) || false,
        secure: (parsed.options.secure as boolean) || false,
        sameSite:
          (parsed.options.sameSite as 'lax' | 'strict' | 'none') || 'lax',
      });
    }

    return response;
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|logo).*)'],
};
