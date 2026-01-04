import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'
import * as jwt from 'jsonwebtoken'
import { ssoJwtSecret } from '../../../../lib/appConfig'
import { DEFAULT_HOME_PATH } from '../../../../lib/navigations'

type AuthPayload = {
  authToken: string
  redirectTo: string
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 365 * 24 * 60 * 60 * 1000,
    path: '/',
  }

  const tok = request.nextUrl.searchParams.get('tok')
  if (ssoJwtSecret && tok) {
    const payload = jwt.verify(tok, ssoJwtSecret) as AuthPayload
    const response = NextResponse.redirect(new URL(payload.redirectTo, request.url))
    response.headers.set(
      'Set-Cookie',
      serialize('auth', payload.authToken, cookieOptions)
    )
    return response
  }

  return NextResponse.redirect(new URL(DEFAULT_HOME_PATH, request.url))
}
