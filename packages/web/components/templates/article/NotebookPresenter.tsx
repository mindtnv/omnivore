'use client'

import { ReadableItem } from '../../../lib/networking/library_items/useLibraryItems'
import { UserBasicData } from '../../../lib/networking/queries/useGetViewerQuery'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { NotebookContent } from './Notebook'
import { NotebookHeader } from './NotebookHeader'
import { useRouter } from 'next/navigation'
import { showErrorToast } from '../../../lib/toastHelpers'
import { ResizableSidebar } from './ResizableSidebar'

type NotebookPresenterProps = {
  viewer: UserBasicData

  item: ReadableItem

  open: boolean
  setOpen: (open: boolean) => void
}

export const NotebookPresenter = (props: NotebookPresenterProps) => {
  const router = useRouter()

  return (
    <ResizableSidebar isShow={props.open} onClose={() => props.setOpen(false)}>
      <NotebookHeader
        viewer={props.viewer}
        item={props.item}
        setShowNotebook={props.setOpen}
      />
      <NotebookContent
        viewer={props.viewer}
        item={props.item}
        viewInReader={(highlightId) => {
          if (!router || !props.viewer) {
            showErrorToast('Error navigating to highlight')
            return
          }
          router.push(
            `/${props.viewer.profile.username}/${props.item.slug}#${highlightId}`
          )
        }}
      />
    </ResizableSidebar>
  )
}
