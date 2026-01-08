import React from 'react'
import { PencilSimple, Trash } from '@phosphor-icons/react'
import { styled } from '../tokens/stitches.config'
import { Tag } from '../elements/Tag'
import { Button } from '../elements/Button'
import { Space } from '../elements/Space'

const RulesCardRoot = styled('div', {
  backgroundColor: '$grayBg',
  border: '1px solid $grayBorder',
  borderRadius: '8px',
  padding: '$3',
  display: 'flex',
  flexDirection: 'column',
  gap: '$3'
})

const RulesCardHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '$2'
})

const RulesCardTitle = styled('h3', {
  margin: 0,
  fontSize: '16px',
  fontWeight: '600',
  color: '$grayTextContrast',
  lineHeight: '1.4'
})

const RulesCardSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2'
})

const RulesCardLabel = styled('div', {
  fontSize: '13px',
  fontWeight: '600',
  color: '$grayText',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
})

const RulesCardContent = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$1',
  alignItems: 'center'
})

const RulesCardFooter = styled('div', {
  display: 'flex',
  gap: '$2',
  paddingTop: '$2',
  borderTop: '1px solid $grayBorder',

  '& button': {
    minHeight: '44px', // Minimum touch target size
    flex: 1
  }
})

const FilterText = styled('span', {
  fontSize: '13px',
  color: '$grayTextContrast',
  fontFamily: 'monospace',
  backgroundColor: '$thBackground2',
  padding: '$1 $2',
  borderRadius: '4px',
  wordBreak: 'break-word'
})

const FailedIndicator = styled('div', {
  fontSize: '12px',
  color: '$error',
  padding: '$1 $2',
  backgroundColor: 'rgba(250, 94, 74, 0.1)',
  border: '1px solid $error',
  borderRadius: '4px',
  fontWeight: '500'
})

interface RuleAction {
  type: string
  params: string[]
  resolvedParams?: string[] // Human-readable parameter values
}

interface Rule {
  id: string
  name: string
  filter: string
  eventTypes?: string[]
  actions: RuleAction[]
  failedAt?: string | null
  enabled?: boolean
}

interface RulesCardProps {
  rule: Rule
  onEdit?: (rule: Rule) => void
  onDelete?: (rule: Rule) => void
}

export const RulesCard = ({ rule, onEdit, onDelete }: RulesCardProps) => {
  const handleEdit = () => {
    onEdit?.(rule)
  }

  const handleDelete = () => {
    onDelete?.(rule)
  }

  return (
    <RulesCardRoot>
      <RulesCardHeader>
        <RulesCardTitle>{rule.name}</RulesCardTitle>
        {rule.failedAt && (
          <FailedIndicator>Failed</FailedIndicator>
        )}
      </RulesCardHeader>

      {rule.filter && (
        <RulesCardSection>
          <RulesCardLabel>Filter</RulesCardLabel>
          <RulesCardContent>
            <FilterText>{rule.filter}</FilterText>
          </RulesCardContent>
        </RulesCardSection>
      )}

      {rule.eventTypes && rule.eventTypes.length > 0 && (
        <RulesCardSection>
          <RulesCardLabel>When</RulesCardLabel>
          <RulesCardContent>
            {rule.eventTypes.map((eventType) => (
              <Tag key={eventType} size="small" variant="outline">
                {eventType}
              </Tag>
            ))}
          </RulesCardContent>
        </RulesCardSection>
      )}

      {rule.actions && rule.actions.length > 0 && (
        <RulesCardSection>
          <RulesCardLabel>Actions</RulesCardLabel>
          <RulesCardContent>
            {rule.actions.map((action, index) => {
              const displayParams = action.resolvedParams || action.params
              return (
                <React.Fragment key={index}>
                  <Tag size="small">
                    {action.type}
                  </Tag>
                  {displayParams && displayParams.length > 0 && displayParams.map((param, paramIndex) => (
                    <Tag key={`${index}-${paramIndex}`} size="small" variant="outline">
                      {param}
                    </Tag>
                  ))}
                </React.Fragment>
              )
            })}
          </RulesCardContent>
        </RulesCardSection>
      )}

      <RulesCardFooter>
        {onEdit && (
          <Button
            style="ctaDarkYellow"
            onClick={handleEdit}
            aria-label={`Edit rule ${rule.name}`}
          >
            <Space direction="horizontal" size="small" align="center">
              <PencilSimple size={16} />
              <span>Edit</span>
            </Space>
          </Button>
        )}
        {onDelete && (
          <Button
            style="ghost"
            onClick={handleDelete}
            aria-label={`Delete rule ${rule.name}`}
          >
            <Space direction="horizontal" size="small" align="center">
              <Trash size={16} />
              <span>Delete</span>
            </Space>
          </Button>
        )}
      </RulesCardFooter>
    </RulesCardRoot>
  )
}
