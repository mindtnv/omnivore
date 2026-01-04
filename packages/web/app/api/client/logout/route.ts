import { NextRequest, NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function GET(request: NextRequest): Promise<NextResponse> {
  const response = new NextResponse('logged out', { status: 200 })
  response.headers.set('Set-Cookie', serialize('auth', '', { maxAge: -1 }))
  return response
}
