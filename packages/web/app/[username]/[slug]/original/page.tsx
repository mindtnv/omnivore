'use client'

export const dynamic = 'force-dynamic'

import { useParams } from 'next/navigation'
import { useGetArticleOriginalHtmlQuery } from '../../../../lib/networking/queries/useGetArticleOriginalHtmlQuery'

export default function Home(): JSX.Element {
  const params = useParams()
  const originalHtml = useGetArticleOriginalHtmlQuery({
    username: params?.username as string,
    slug: params?.slug as string,
    includeFriendsHighlights: false,
  })

  if (!originalHtml) {
    return <div>error</div>
  }

  return (
    <textarea style={{ width: '100vw', height: '100vh' }}>
      {originalHtml}
    </textarea>
  )
}
