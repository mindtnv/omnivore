import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { locale, timeZone } from '../../../lib/dateFormatting'
import { SaveResponseData } from '../../../lib/networking/mutations/saveUrlMutation'
import { ssrFetcher } from '../../../lib/networking/networkHelpers'

const saveUrl = async (
  authCookie: string | undefined,
  url: URL,
  labels: string[] | undefined,
  state: string | undefined,
  timezone?: string,
  locale?: string
) => {
  const clientRequestId = uuidv4()
  const mutation = `
    mutation SaveUrl($input: SaveUrlInput!) {
      saveUrl(input: $input) {
        ... on SaveSuccess {
          url
          clientRequestId
        }
        ... on SaveError {
          errorCodes
          message
        }
      }
    }
  `

  try {
    // Create a mock request object for ssrFetcher compatibility
    const mockReq = {
      cookies: authCookie ? { auth: authCookie } : {},
    }
    const data = await ssrFetcher({ req: mockReq as any }, mutation, {
      input: {
        clientRequestId,
        url: url.toString(),
        source: 'api-save-url',
        labels: labels?.map((label) => ({ name: label })),
        state,
        timezone,
        locale,
      },
    })

    const output = data as SaveResponseData | undefined
    return {
      url: output?.saveUrl?.url,
      jobId: output?.saveUrl?.clientRequestId,
      clientRequestId: output?.saveUrl?.clientRequestId,
    }
  } catch (error) {
    console.log('error savingUrl', { error })
    return undefined
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams
  const urlStr = searchParams.get('url')

  if (!urlStr) {
    return new NextResponse('Missing url parameter', { status: 400 })
  }

  // Handle labels - can be single string or array
  let labels: string[] | undefined
  const labelsParam = searchParams.getAll('labels')
  if (labelsParam.length > 0) {
    labels = labelsParam
  }

  const state = searchParams.get('state') ?? undefined
  const authCookie = request.cookies.get('auth')?.value

  try {
    const url = new URL(urlStr)
    const saveResult = await saveUrl(authCookie, url, labels, state, timeZone, locale)
    console.log('saveResult: ', saveResult)

    if (saveResult) {
      return NextResponse.redirect(
        new URL(`/article?url=${encodeURIComponent(url.toString())}`, request.url)
      )
    }

    return new NextResponse('ok', { status: 200 })
  } catch (error) {
    console.log('error parsing url', { error })
    return new NextResponse('Invalid url parameter', { status: 400 })
  }
}
