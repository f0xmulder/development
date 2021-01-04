// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, number, shape } from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Drawer } from '@commonground/design-system'

import Grade from '../../../Grade/Grade'
import CheckmarkCircle from '../../../Icons/Circles/CheckmarkCircle'
import CrossCircle from '../../../Icons/Circles/CrossCircle'
import { IconList, StyledDrawer } from '../../APIDetails.styles'
import { designRuleScores } from '../../../../models/propTypes'
import {
  GradeSection,
  IntroSection,
  StyledLink,
  ExternalIcon,
  StyledIconListItem,
  DesignRuleTitle,
  DesignRuleDescription,
  CollapsibleContainer,
  ErrorsCollapsible,
  ErrorList,
  Error,
  StyledExclamationMark,
  StyledErrorsTitle,
  DesignRuleLinkContainer,
} from './APIDesignRulesPane.styles'

const ErrorsTitle = ({ titleText }) => (
  <StyledErrorsTitle>
    <StyledExclamationMark />
    {titleText}
  </StyledErrorsTitle>
)
ErrorsTitle.propTypes = {
  titleText: string,
}

const APIDesignRulesPane = ({ designRuleScores, totalScore, parentUrl }) => {
  const history = useHistory()

  const close = () => history.push(parentUrl)

  return (
    <StyledDrawer closeHandler={close} data-testid="design-rules-pane">
      <Drawer.Header title="Opbouw API Score" closeButtonLabel="Sluit" />
      <Drawer.Content>
        <p>Deze score geeft de kwaliteit van de API weer.</p>

        <GradeSection>
          <Grade totalScore={totalScore} largeAtMediaQuery="xsUp" />
        </GradeSection>

        <IntroSection>
          De score geeft weer hoe compliant deze API is met de{' '}
          <StyledLink
            href="https://docs.geostandaarden.nl/api/API-Designrules/"
            target="_blank"
            rel="noopener noreferrer"
          >
            API design rules
          </StyledLink>
          . Dit zijn de afspraken die we gemaakt hebben over API design. Een
          aantal design rules controleren we automatisch:
        </IntroSection>

        <IconList>
          {designRuleScores.results.map((rule, index) => {
            const hasErrors = rule.errors.length > 0
            const errorText = hasErrors
              ? `${rule.errors.length} bevinding${
                  rule.errors.length > 1 ? 'en' : ''
                } bij automatische test`
              : ''
            return (
              <StyledIconListItem key={index}>
                <IconList.ListItem.Icon>
                  {rule.success ? <CheckmarkCircle /> : <CrossCircle />}
                </IconList.ListItem.Icon>
                <IconList.ListItem.Content>
                  <DesignRuleTitle>{rule.name}</DesignRuleTitle>
                  <DesignRuleDescription>
                    {rule.description}
                  </DesignRuleDescription>
                  <StyledLink
                    href={rule.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ga naar Design Rule ${rule.name}`}
                  >
                    <DesignRuleLinkContainer>
                      <span>Ga naar Design Rule</span>
                      <ExternalIcon />
                    </DesignRuleLinkContainer>
                  </StyledLink>

                  {hasErrors ? (
                    <CollapsibleContainer>
                      <ErrorsCollapsible
                        title={<ErrorsTitle titleText={errorText} />}
                        ariaLabel={errorText}
                      >
                        <ErrorList>
                          {rule.errors.map((error, index) => (
                            <Error key={index}>{error}</Error>
                          ))}
                        </ErrorList>
                      </ErrorsCollapsible>
                    </CollapsibleContainer>
                  ) : null}
                </IconList.ListItem.Content>
              </StyledIconListItem>
            )
          })}
        </IconList>
      </Drawer.Content>
    </StyledDrawer>
  )
}

APIDesignRulesPane.propTypes = {
  designRuleScores: designRuleScores.isRequired,
  totalScore: shape({
    points: number.isRequired,
    maxPoints: number.isRequired,
  }).isRequired,
  parentUrl: string.isRequired,
}

export default APIDesignRulesPane
