import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['fr', 'en', 'de', 'es'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
});

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
