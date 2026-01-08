import { LibraryItemNode } from '../../../lib/networking/library_items/useLibraryItems'
import { HStack, SpanBox } from '../../elements/LayoutPrimitives'
import { RecommendedFlairIcon } from '../../elements/icons/RecommendedFlairIcon'
import { PinnedFlairIcon } from '../../elements/icons/PinnedFlairIcon'
import { FavoriteFlairIcon } from '../../elements/icons/FavoriteFlairIcon'
import { NewsletterFlairIcon } from '../../elements/icons/NewsletterFlairIcon'
import { FeedFlairIcon } from '../../elements/icons/FeedFlairIcon'
import { Label } from '../../../lib/networking/fragments/labelFragment'
import { timeAgo } from '../../../lib/textFormatting'
import { Globe, Sparkle, Translate, CircleNotch, Cards } from '@phosphor-icons/react'
import { styled, keyframes, theme } from '../../tokens/stitches.config'

export const MenuStyle = {
  display: 'flex',
  marginLeft: 'auto',
  height: '30px',
  width: '30px',
  mt: '-5px',
  mr: '-5px',
  pt: '2px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '1000px',
  '&:hover': {
    bg: '$thBackground4',
  },
}

export const MetaStyle = {
  width: '100%',
  color: '$thTextSubtle2',
  fontSize: '12px',
  fontWeight: '500',
  fontFamily: '$display',
  maxLines: 1,
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
  lineHeight: 1.25,
  '@mdDown': {
    fontSize: '14px',
  },
}

export const TitleStyle = {
  color: '$thTextContrast2',
  fontSize: '16px',
  fontWeight: '700',
  maxLines: 2,
  lineHeight: 1.5,
  fontFamily: '$display',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-word',
  display: '-webkit-box',
  '-webkit-line-clamp': '2',
  '-webkit-box-orient': 'vertical',
  '@mdDown': {
    fontSize: '15px',
  },
}

export const AuthorInfoStyle = {
  maxLines: '1',
  maxWidth: '240px',
  color: '$thNotebookSubtle',
  fontSize: '12px',
  fontWeight: '400',
  fontFamily: '$display',
  lineHeight: 1.25,
  wordWrap: 'break-word',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@mdDown': {
    fontSize: '13px',
  },
}

export const FLAIR_ICON_NAMES = [
  'favorite',
  'pinned',
  'recommended',
  'newsletter',
  'feed',
  'rss',
]

const flairIconForLabel = (label: Label): JSX.Element | undefined => {
  switch (label.name.toLocaleLowerCase()) {
    case 'favorite':
      return (
        <FlairIcon title="Favorite">
          <FavoriteFlairIcon />
        </FlairIcon>
      )
    case 'pinned':
      return (
        <FlairIcon title="Pinned">
          <PinnedFlairIcon />
        </FlairIcon>
      )
    case 'recommended':
      return (
        <FlairIcon title="Recommended">
          <RecommendedFlairIcon />
        </FlairIcon>
      )
    case 'newsletter':
      return (
        <FlairIcon title="Newsletter">
          <NewsletterFlairIcon />
        </FlairIcon>
      )
    case 'rss':
    case 'feed':
      return (
        <FlairIcon title="Feed">
          <FeedFlairIcon />
        </FlairIcon>
      )
  }
  return undefined
}

type FlairIconProps = {
  title: string
  children: React.ReactNode
}

export function FlairIcon(props: FlairIconProps): JSX.Element {
  return (
    <SpanBox title={props.title} css={{ lineHeight: '1' }}>
      {props.children}
    </SpanBox>
  )
}

type LibraryItemMetadataProps = {
  item: LibraryItemNode
  showProgress?: boolean
}

export function LibraryItemMetadata(
  props: LibraryItemMetadataProps
): JSX.Element {
  const highlightCount = props.item.highlightsCount ?? 0

  return (
    <HStack css={{ gap: '5px', alignItems: 'center' }}>
      {props.item.labels?.map((label) => {
        return flairIconForLabel(label)
      })}
      {timeAgo(props.item.savedAt)}
      {` `}
      {props.item.wordsCount ?? 0 > 0
        ? `  • ${Math.max(
            1,
            Math.round((props.item.wordsCount ?? 0) / 235)
          )} min read`
        : null}
      {highlightCount > 0
        ? `  • ${highlightCount} highlight${highlightCount > 1 ? 's' : ''}`
        : null}
    </HStack>
  )
}

type CardCheckBoxProps = {
  isChecked: boolean
  handleChanged: () => void
}

export function CardCheckbox(props: CardCheckBoxProps): JSX.Element {
  return (
    <form
      // This prevents us from propogating up the the <a element on cards
      onClick={(event) => {
        event.stopPropagation()
      }}
      style={{
        minHeight: '44px',
        minWidth: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        type="checkbox"
        checked={props.isChecked}
        onChange={(event) => {
          props.handleChanged()
          event.stopPropagation()
        }}
        style={{
          minHeight: '24px',
          minWidth: '24px',
        }}
      ></input>
    </form>
  )
}

// Indicator badge styles
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const IndicatorBadge = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '3px',
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: '500',
  fontFamily: '$display',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  variants: {
    variant: {
      language: {
        backgroundColor: '$thBackground4',
        color: '$thTextSubtle2',
      },
      ai: {
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        color: 'rgb(147, 51, 234)',
      },
      translation: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: 'rgb(59, 130, 246)',
      },
      translationProcessing: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        color: 'rgb(245, 158, 11)',
      },
      anki: {
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        color: 'rgb(34, 197, 94)',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
        },
      },
      ankiProcessing: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        color: 'rgb(245, 158, 11)',
      },
    },
  },
})

const SpinningIcon = styled(CircleNotch, {
  animation: `${spin} 1s linear infinite`,
})

// Get 2-letter language code from full language name
const getLanguageCode = (language?: string | null): string => {
  if (!language) return ''

  const languageMap: Record<string, string> = {
    english: 'EN',
    russian: 'RU',
    german: 'DE',
    french: 'FR',
    spanish: 'ES',
    italian: 'IT',
    portuguese: 'PT',
    chinese: 'ZH',
    japanese: 'JA',
    korean: 'KO',
    arabic: 'AR',
    dutch: 'NL',
    polish: 'PL',
    ukrainian: 'UK',
    turkish: 'TR',
    swedish: 'SV',
    norwegian: 'NO',
    danish: 'DA',
    finnish: 'FI',
    czech: 'CS',
    hungarian: 'HU',
    romanian: 'RO',
    bulgarian: 'BG',
    greek: 'EL',
    hebrew: 'HE',
    thai: 'TH',
    vietnamese: 'VI',
    indonesian: 'ID',
    malay: 'MS',
    hindi: 'HI',
  }

  const lowerLang = language.toLowerCase()
  if (languageMap[lowerLang]) {
    return languageMap[lowerLang]
  }

  if (language.length === 2) {
    return language.toUpperCase()
  }

  return language.slice(0, 2).toUpperCase()
}

export type AnkiCardStatusType =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED'
  | 'WAITING_FOR_TRANSLATION'

type LibraryItemIndicatorsProps = {
  item: LibraryItemNode
  ankiCardStatus?: AnkiCardStatusType | null
  ankiCardCount?: number
  onAnkiBadgeClick?: () => void
}

export function LibraryItemIndicators(
  props: LibraryItemIndicatorsProps
): JSX.Element | null {
  const { item, ankiCardStatus, ankiCardCount, onAnkiBadgeClick } = props
  const hasLanguage = !!item.language
  const hasAiSummary = !!item.aiSummary
  const hasTranslation = item.translationStatus === 'COMPLETED'
  const isTranslating =
    item.translationStatus === 'PROCESSING' ||
    item.translationStatus === 'PENDING'
  const hasAnkiCards = ankiCardStatus === 'COMPLETED' && (ankiCardCount ?? 0) > 0
  const isAnkiProcessing =
    ankiCardStatus === 'PROCESSING' ||
    ankiCardStatus === 'PENDING' ||
    ankiCardStatus === 'WAITING_FOR_TRANSLATION'

  // Don't render if no indicators to show
  if (!hasLanguage && !hasAiSummary && !hasTranslation && !isTranslating && !hasAnkiCards && !isAnkiProcessing) {
    return null
  }

  const languageCode = getLanguageCode(item.language)
  const translatedCode = getLanguageCode(item.translatedLanguage)

  return (
    <HStack css={{ gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
      {/* Language indicator */}
      {hasLanguage && languageCode && (
        <IndicatorBadge
          variant="language"
          title={`Original language: ${item.language}`}
        >
          <Globe size={10} weight="bold" />
          {languageCode}
        </IndicatorBadge>
      )}

      {/* AI Summary indicator */}
      {hasAiSummary && (
        <IndicatorBadge variant="ai" title="AI Summary available">
          <Sparkle size={10} weight="fill" />
          AI
        </IndicatorBadge>
      )}

      {/* Translation available indicator */}
      {hasTranslation && translatedCode && (
        <IndicatorBadge
          variant="translation"
          title={`Translated to ${item.translatedLanguage}`}
        >
          <Translate size={10} weight="bold" />
          {translatedCode}
        </IndicatorBadge>
      )}

      {/* Translation in progress indicator */}
      {isTranslating && (
        <IndicatorBadge variant="translationProcessing" title="Translation in progress">
          <SpinningIcon size={10} weight="bold" />
          ...
        </IndicatorBadge>
      )}

      {/* Anki cards available indicator */}
      {hasAnkiCards && (
        <IndicatorBadge
          variant="anki"
          title={`${ankiCardCount} Anki card${ankiCardCount !== 1 ? 's' : ''} generated`}
          onClick={(e) => {
            e.stopPropagation()
            onAnkiBadgeClick?.()
          }}
        >
          <Cards size={10} weight="bold" />
          {ankiCardCount}
        </IndicatorBadge>
      )}

      {/* Anki processing indicator */}
      {isAnkiProcessing && (
        <IndicatorBadge variant="ankiProcessing" title="Generating Anki cards...">
          <SpinningIcon size={10} weight="bold" />
          <Cards size={10} weight="bold" />
        </IndicatorBadge>
      )}
    </HStack>
  )
}
