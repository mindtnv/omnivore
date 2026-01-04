import { Separator } from '@radix-ui/react-separator'
import { ArticleAttributes } from '../../../lib/networking/library_items/useLibraryItems'
import { Button } from '../../elements/Button'
import { Box, SpanBox } from '../../elements/LayoutPrimitives'
import { styled, theme } from '../../tokens/stitches.config'
import { ReaderSettings } from '../../../lib/hooks/useReaderSettings'
import { useRef, useState, useEffect } from 'react'
import { ArchiveIcon } from '../../elements/icons/ArchiveIcon'
import { NotebookIcon } from '../../elements/icons/NotebookIcon'
import { TrashIcon } from '../../elements/icons/TrashIcon'
import { LabelIcon } from '../../elements/icons/LabelIcon'
import { EditInfoIcon } from '../../elements/icons/EditInfoIcon'
import { UnarchiveIcon } from '../../elements/icons/UnarchiveIcon'
import { State } from '../../../lib/networking/fragments/articleFragment'
import { LanguageToggle } from '../../elements/LanguageToggle'

export type ArticleActionsMenuLayout = 'top' | 'side'

type ArticleActionsMenuProps = {
  article?: ArticleAttributes
  layout: ArticleActionsMenuLayout
  showReaderDisplaySettings?: boolean
  readerSettings: ReaderSettings
  articleActionHandler: (action: string, arg?: unknown) => void
  // Translation props
  showTranslation?: boolean
  onToggleTranslation?: () => void
  targetLanguage?: string | null
}

type MenuSeparatorProps = {
  layout: ArticleActionsMenuLayout
}

const MenuSeparator = (props: MenuSeparatorProps): JSX.Element => {
  const LineSeparator = styled(Separator, {
    width: '100%',
    margin: 0,
    borderBottom: `1px solid ${theme.colors.thHighContrast.toString()}`,
    my: '8px',
  })
  return props.layout == 'side' ? <LineSeparator /> : <></>
}

// Check if translation toggle should be shown
const shouldShowTranslation = (article?: ArticleAttributes): boolean => {
  if (!article) return false
  return !!(
    article.translatedContent ||
    article.translationStatus === 'PROCESSING' ||
    article.translationStatus === 'PENDING'
  )
}

export function ArticleActionsMenu(
  props: ArticleActionsMenuProps
): JSX.Element {
  const displaySettingsButtonRef = useRef<HTMLElement | null>(null)
  const showTranslationToggle = shouldShowTranslation(props.article) && props.onToggleTranslation

  // Use mounted state to prevent hydration mismatch
  // Server and client may have different values for article and theme
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render during SSR to avoid hydration mismatch
  if (!mounted) {
    return <></>
  }

  return (
    <>
      <Box
        css={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: props.layout == 'side' ? 'column' : 'row',
          justifyContent: props.layout == 'side' ? 'center' : 'flex-end',
          gap: props.layout == 'side' ? '15px' : '25px',
          paddingTop: '6px',
        }}
      >
        {/* Labels button - desktop only (sidebar has its own) */}
        <SpanBox
          css={{
            display: 'flex',
            alignItems: 'center',
            '@mdDown': {
              display: 'none',
            },
          }}
        >
          {props.article ? (
            <>
              <Button
                title="Edit labels (l)"
                style="articleActionIcon"
                onClick={() => props.readerSettings.setShowSetLabelsModal(true)}
              >
                <SpanBox ref={displaySettingsButtonRef}>
                  <LabelIcon
                    size={24}
                    color={theme.colors.thHighContrast.toString()}
                  />
                </SpanBox>
              </Button>
              <MenuSeparator layout={props.layout} />
            </>
          ) : (
            <Button
              title="Edit labels (l)"
              style="articleActionIcon"
              css={{
                '@smDown': {
                  display: 'flex',
                },
              }}
            >
              <LabelIcon
                size={24}
                color={theme.colors.thHighContrast.toString()}
              />
            </Button>
          )}
        </SpanBox>

        {/* Labels button - mobile only */}
        <Button
          title="Edit labels (l)"
          style="articleActionIcon"
          onClick={() => props.articleActionHandler('setLabels')}
          css={{
            display: 'none',
            '@mdDown': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <LabelIcon size={24} color={theme.colors.thHighContrast.toString()} />
        </Button>

        {/* Notebook button */}
        <Button
          title="View notebook (t)"
          style="articleActionIcon"
          onClick={() => props.articleActionHandler('showHighlights')}
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <NotebookIcon
            size={24}
            color={theme.colors.thHighContrast.toString()}
          />
        </Button>

        {/* Edit info button - desktop only */}
        <Button
          title="Edit info (i)"
          style="articleActionIcon"
          onClick={() => props.articleActionHandler('showEditModal')}
          css={{
            display: 'flex',
            alignItems: 'center',
            '@mdDown': {
              display: 'none',
            },
          }}
        >
          <EditInfoIcon
            size={24}
            color={theme.colors.thHighContrast.toString()}
          />
        </Button>

        {/* Language Toggle - shown when translation is available */}
        {showTranslationToggle && props.article && (
          <LanguageToggle
            originalLanguage={props.article.language}
            translatedLanguage={props.article.translatedLanguage}
            targetLanguage={props.targetLanguage}
            hasTranslation={!!props.article.translatedContent}
            translationStatus={props.article.translationStatus}
            showTranslation={props.showTranslation ?? false}
            onToggle={props.onToggleTranslation!}
          />
        )}

        <MenuSeparator layout={props.layout} />

        {/* Delete button - desktop only */}
        <Button
          title="Remove (#)"
          style="articleActionIcon"
          onClick={() => {
            props.articleActionHandler('delete')
          }}
          css={{
            display: 'flex',
            alignItems: 'center',
            '@mdDown': {
              display: 'none',
            },
          }}
        >
          <TrashIcon size={24} color={theme.colors.thHighContrast.toString()} />
        </Button>

        {/* Archive/Unarchive button */}
        {props.article?.state !== State.ARCHIVED ? (
          <Button
            title="Archive (e)"
            style="articleActionIcon"
            onClick={() => props.articleActionHandler('archive')}
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ArchiveIcon
              size={24}
              color={theme.colors.thHighContrast.toString()}
            />
          </Button>
        ) : (
          <Button
            title="Unarchive (e)"
            style="articleActionIcon"
            onClick={() => props.articleActionHandler('unarchive')}
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <UnarchiveIcon
              size={24}
              color={theme.colors.thHighContrast.toString()}
            />
          </Button>
        )}
      </Box>
    </>
  )
}
