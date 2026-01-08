'use client'

export const dynamic = 'force-dynamic'

import { useCallback, useMemo, useState } from 'react'
import { Box, HStack, VStack } from '../../../components/elements/LayoutPrimitives'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components/elements/Table'
import { Select } from '../../../components/elements/Select'
import { Tag } from '../../../components/elements/Tag'
import { Space } from '../../../components/elements/Space'
import { Button } from '../../../components/elements/Button'
import { BorderedFormInput, FormLabel, FormGroupComponent } from '../../../components/elements/FormElements'
import { ModalRoot, ModalOverlay, ModalContent, ModalTitleBar, ModalButtonBar } from '../../../components/elements/ModalPrimitives'
import { BottomSheet } from '../../../components/patterns/BottomSheet'
import { RulesCard } from '../../../components/patterns/RulesCard'
import { useIsMobile } from '../../../lib/hooks/useMediaQuery'

import { Label } from '../../../lib/networking/fragments/labelFragment'
import { deleteRuleMutation } from '../../../lib/networking/mutations/deleteRuleMutation'
import { setRuleMutation } from '../../../lib/networking/mutations/setRuleMutation'
import { useGetIntegrationsQuery } from '../../../lib/networking/queries/useGetIntegrationsQuery'
import {
  Rule,
  RuleAction,
  RuleActionType,
  RuleEventType,
  useGetRulesQuery,
} from '../../../lib/networking/queries/useGetRulesQuery'
import { applyStoredTheme } from '../../../lib/themeUpdater'
import { showErrorToast, showSuccessToast } from '../../../lib/toastHelpers'
import { useGetLabels } from '../../../lib/networking/labels/useLabels'

type CreateRuleModalProps = {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  revalidate: () => void
}

const eventTypeObj = {
  PAGE_CREATED: 'PAGE_CREATED',
  PAGE_UPDATED: 'PAGE_UPDATED',
  HIGHLIGHT_CREATED: 'HIGHLIGHT_CREATED',
  HIGHLIGHT_UPDATED: 'HIGHLIGHT_UPDATED',
  LABEL_CREATED: 'LABEL_ATTACHED',
}

const CreateRuleModal = (props: CreateRuleModalProps): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    filter: '',
    eventTypes: [] as RuleEventType[]
  })
  const [errors, setErrors] = useState({ name: '', eventTypes: '' })
  const isMobile = useIsMobile()

  const validateForm = () => {
    const newErrors = { name: '', eventTypes: '' }
    if (!formData.name.trim()) newErrors.name = 'Please enter the rule name.'
    if (formData.eventTypes.length === 0) newErrors.eventTypes = 'Please select when the rule will be triggered'
    setErrors(newErrors)
    return !newErrors.name && !newErrors.eventTypes
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    const filter = formData.filter || 'in:all' // default to all
    try {
      await setRuleMutation({
        name: formData.name,
        filter,
        actions: [],
        enabled: true,
        eventTypes: formData.eventTypes,
      })

      setFormData({ name: '', filter: '', eventTypes: [] })
      setErrors({ name: '', eventTypes: '' })
      props.setIsModalOpen(false)
      props.revalidate()
      showSuccessToast('Rule created')
    } catch (error) {
      showErrorToast('Error creating rule')
    }
  }

  const handleCancel = () => {
    setFormData({ name: '', filter: '', eventTypes: [] })
    setErrors({ name: '', eventTypes: '' })
    props.setIsModalOpen(false)
  }

  const formFields = (
    <VStack css={{ gap: '$3' }}>
      <FormGroupComponent label="Name" required error={errors.name}>
        <BorderedFormInput
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter rule name"
        />
      </FormGroupComponent>

      <FormGroupComponent label="Filter" help='Optional. Defaults to "in:all"'>
        <BorderedFormInput
          value={formData.filter}
          onChange={(e) => setFormData({ ...formData, filter: e.target.value })}
          placeholder="in:all"
        />
      </FormGroupComponent>

      <FormGroupComponent label="When" required error={errors.eventTypes}>
        <Select
          multiple
          value={formData.eventTypes}
          onValueChange={(values) => setFormData({ ...formData, eventTypes: values as RuleEventType[] })}
          placeholder="Select when the rule will be triggered"
          options={Object.values(RuleEventType).map(value => ({
            label: eventTypeObj[value],
            value: value
          }))}
        />
      </FormGroupComponent>
    </VStack>
  )

  if (isMobile) {
    return (
      <BottomSheet open={props.isModalOpen} onOpenChange={props.setIsModalOpen} title="Create Rule">
        {formFields}
        <Space direction="horizontal" size="medium" css={{ mt: '$4' }}>
          <Button style="cancelGeneric" onClick={handleCancel}>Cancel</Button>
          <Button style="ctaDarkYellow" onClick={handleSubmit}>Create</Button>
        </Space>
      </BottomSheet>
    )
  }

  return (
    <ModalRoot open={props.isModalOpen} onOpenChange={props.setIsModalOpen}>
      <ModalOverlay />
      <ModalContent css={{ padding: '$4' }}>
        <ModalTitleBar title="Create Rule" onOpenChange={props.setIsModalOpen} />
        <VStack css={{ gap: '$3', py: '$3' }}>
          {formFields}
        </VStack>
        <ModalButtonBar
          acceptButtonLabel="Create"
          onAccept={handleSubmit}
          onOpenChange={props.setIsModalOpen}
        />
      </ModalContent>
    </ModalRoot>
  )
}

type CreateActionModalProps = {
  rule: Rule | undefined
  setIsModalOpen: (isOpen: boolean) => void
  revalidate: () => void
}

const CreateActionModal = (props: CreateActionModalProps): JSX.Element => {
  const { data: labels } = useGetLabels()
  const { integrations } = useGetIntegrationsQuery()
  const [actionType, setActionType] = useState<RuleActionType | undefined>(undefined)
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [webhookUrl, setWebhookUrl] = useState('')
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])
  const [errors, setErrors] = useState({ actionType: '', labels: '', url: '', integrations: '' })
  const isMobile = useIsMobile()

  const integrationOptions = ['NOTION', 'READWISE']

  const isIntegrationEnabled = (integration: string): boolean => {
    return integrations.some(
      (i) => i.name.toUpperCase() === integration.toUpperCase()
    )
  }

  const validateForm = () => {
    const newErrors = { actionType: '', labels: '', url: '', integrations: '' }
    if (!actionType) newErrors.actionType = 'Please choose an action'
    if (actionType === RuleActionType.AddLabel && selectedLabels.length === 0) {
      newErrors.labels = 'Please choose at least one label'
    }
    if (actionType === RuleActionType.Webhook && !webhookUrl.trim()) {
      newErrors.url = 'Please key in your webhook url'
    }
    if (actionType === RuleActionType.Export) {
      if (selectedIntegrations.length === 0) {
        newErrors.integrations = 'Please choose at least one integration'
      } else {
        const disabledIntegrations = selectedIntegrations.filter(i => !isIntegrationEnabled(i))
        if (disabledIntegrations.length > 0) {
          newErrors.integrations = `Integration ${disabledIntegrations[0]} is not enabled`
        }
      }
    }
    setErrors(newErrors)
    return !newErrors.actionType && !newErrors.labels && !newErrors.url && !newErrors.integrations
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    if (!actionType) return // Type guard after validation

    let params: string[] = []
    if (actionType === RuleActionType.AddLabel) {
      params = selectedLabels
    } else if (actionType === RuleActionType.Webhook) {
      params = [webhookUrl]
    } else if (actionType === RuleActionType.Export) {
      params = selectedIntegrations
    }

    if (props.rule) {
      // prevent adding duplicate actions
      if (props.rule.actions.some((a) => a.type === actionType)) {
        showErrorToast('Action already exists in the rule.')
        return
      }

      await setRuleMutation({
        id: props.rule.id,
        name: props.rule.name,
        filter: props.rule.filter,
        enabled: props.rule.enabled,
        actions: [
          ...props.rule.actions,
          {
            type: actionType,
            params: params,
          },
        ],
        eventTypes: props.rule.eventTypes,
      })

      resetForm()
      props.setIsModalOpen(false)
      props.revalidate()
      showSuccessToast('Action created')
    }
  }

  const resetForm = () => {
    setActionType(undefined)
    setSelectedLabels([])
    setWebhookUrl('')
    setSelectedIntegrations([])
    setErrors({ actionType: '', labels: '', url: '', integrations: '' })
  }

  const handleCancel = () => {
    resetForm()
    props.setIsModalOpen(false)
  }

  const formFields = (
    <VStack css={{ gap: '$3' }}>
      <FormGroupComponent label="Action" required error={errors.actionType}>
        <Select
          value={actionType}
          onValueChange={(value) => setActionType(value as RuleActionType)}
          placeholder="Choose an action"
          options={Object.keys(RuleActionType).map((key, index) => ({
            label: key,
            value: Object.values(RuleActionType)[index]
          }))}
        />
      </FormGroupComponent>

      {actionType === RuleActionType.AddLabel && (
        <FormGroupComponent label="Labels" required error={errors.labels}>
          <Select
            multiple
            value={selectedLabels}
            onValueChange={(values) => setSelectedLabels(values as string[])}
            placeholder="Choose at least one label"
            options={labels?.map(label => ({ label: label.name, value: label.id })) || []}
          />
        </FormGroupComponent>
      )}

      {actionType === RuleActionType.Webhook && (
        <FormGroupComponent label="URL" required error={errors.url}>
          <BorderedFormInput
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="Enter webhook URL"
          />
        </FormGroupComponent>
      )}

      {actionType === RuleActionType.Export && (
        <FormGroupComponent label="Integrations" required error={errors.integrations}>
          <Select
            multiple
            value={selectedIntegrations}
            onValueChange={(values) => setSelectedIntegrations(values as string[])}
            placeholder="Choose at least one integration"
            options={integrationOptions.map(integration => ({
              label: isIntegrationEnabled(integration) ? integration : `Connect to ${integration}`,
              value: integration,
              disabled: !isIntegrationEnabled(integration)
            }))}
          />
        </FormGroupComponent>
      )}
    </VStack>
  )

  if (isMobile) {
    return (
      <BottomSheet open={props.rule !== undefined} onOpenChange={(open) => !open && handleCancel()} title="Create Action">
        {formFields}
        <Space direction="horizontal" size="medium" css={{ mt: '$4' }}>
          <Button style="cancelGeneric" onClick={handleCancel}>Cancel</Button>
          <Button style="ctaDarkYellow" onClick={handleSubmit}>Create</Button>
        </Space>
      </BottomSheet>
    )
  }

  return (
    <ModalRoot open={props.rule !== undefined} onOpenChange={(open) => !open && handleCancel()}>
      <ModalOverlay />
      <ModalContent css={{ padding: '$4' }}>
        <ModalTitleBar title="Create Action" onOpenChange={(open) => !open && handleCancel()} />
        <VStack css={{ gap: '$3', py: '$3' }}>
          {formFields}
        </VStack>
        <ModalButtonBar
          acceptButtonLabel="Create"
          onAccept={handleSubmit}
          onOpenChange={(open) => !open && handleCancel()}
        />
      </ModalContent>
    </ModalRoot>
  )
}

export default function Rules(): JSX.Element {
  const { rules, revalidate } = useGetRulesQuery()
  const { data: labels } = useGetLabels()
  const [isCreateRuleModalOpen, setIsCreateRuleModalOpen] = useState(false)
  const [createActionRule, setCreateActionRule] =
    useState<Rule | undefined>(undefined)
  const isMobile = useIsMobile()

  applyStoredTheme()

  const deleteRule = useCallback(
    async (rule: Rule) => {
      if (!(await deleteRuleMutation(rule.id))) {
        showErrorToast('Error deleting rule')
      } else {
        showSuccessToast('Rule deleted')
      }
      revalidate()
    },
    [rules, revalidate]
  )

  const stringForActionParam = useCallback(
    (actionType: RuleActionType, param: string): string => {
      if (actionType === RuleActionType.AddLabel) {
        if (!labels) {
          return ''
        }
        return (
          labels.find((label: Label) => {
            const result = label.id == param
            return result
          })?.name ?? 'unknown'
        )
      }
      return param
    },
    [labels]
  )

  return (
    <>
      <CreateRuleModal
        revalidate={revalidate}
        isModalOpen={isCreateRuleModalOpen}
        setIsModalOpen={setIsCreateRuleModalOpen}
      />

      <CreateActionModal
        rule={createActionRule}
        setIsModalOpen={(isOpen) => {
          if (!isOpen) {
            setCreateActionRule(undefined)
          }
        }}
        revalidate={revalidate}
      />

      <Box
        css={{ pt: '44px', px: '10%', '@smDown': { px: '0' }, width: '100%' }}
      >
        {isMobile ? (
          <VStack css={{ gap: '$3', width: '100%' }}>
            <Button
              style="ctaDarkYellow"
              css={{ width: '100%', minHeight: '44px' }}
              onClick={() => setIsCreateRuleModalOpen(true)}
            >
              Create a new Rule
            </Button>

            {rules.map((rule) => (
              <RulesCard
                key={rule.id}
                rule={{
                  id: rule.id,
                  name: rule.name,
                  filter: rule.filter,
                  enabled: rule.enabled,
                  failedAt: rule.failedAt ? rule.failedAt.toISOString() : null,
                  eventTypes: rule.eventTypes.map(et => eventTypeObj[et]),
                  actions: rule.actions.map(action => ({
                    type: action.type,
                    params: action.params,
                    resolvedParams: action.params.map(param => stringForActionParam(action.type, param))
                  }))
                }}
                onEdit={() => setCreateActionRule(rule)}
                onDelete={() => deleteRule(rule)}
              />
            ))}
          </VStack>
        ) : (
          <>
            <HStack css={{ py: '16px' }} distribution="end">
              <Button
                style="ctaDarkYellow"
                onClick={() => setIsCreateRuleModalOpen(true)}
              >
                Create a new Rule
              </Button>
            </HStack>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Filter</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>Failed At</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>{rule.name}</TableCell>
                    <TableCell>{rule.filter}</TableCell>
                    <TableCell>
                      {rule.eventTypes.map((eventType, index) => (
                        <Tag key={index} size="small" variant="outline">
                          {eventTypeObj[eventType]}
                        </Tag>
                      ))}
                    </TableCell>
                    <TableCell>
                      {rule.actions.map((action, index) => (
                        <Tag key={index} size="small" css={{ whiteSpace: 'unset' }}>
                          {action.type}({action.params.map((param, i) =>
                            `"${stringForActionParam(action.type, param)}${i === action.params.length - 1 ? '"' : '", '}`
                          )})
                        </Tag>
                      ))}
                    </TableCell>
                    <TableCell>{rule.failedAt ? rule.failedAt.toISOString() : '-'}</TableCell>
                    <TableCell>
                      <Space direction="horizontal" size="small">
                        <Button style="ctaDarkYellow" onClick={() => setCreateActionRule(rule)}>
                          Add Action
                        </Button>
                        <Button style="cancelGeneric" onClick={() => deleteRule(rule)}>
                          Delete
                        </Button>
                      </Space>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </Box>
    </>
  )
}
