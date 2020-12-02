// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { string, number, object, shape } from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Drawer } from '@commonground/design-system'

import Grade from '../../../Grade/Grade'
import CheckmarkCircle from '../../../Icons/Circles/CheckmarkCircle'
import CrossCircle from '../../../Icons/Circles/CrossCircle'
import {
  GradeSection,
  IntroSection,
  StyledLink,
  ExternalIcon,
  DesignRulesList,
  DesignRule,
  DesignRuleTitle,
  DesignRuleDescription,
  CollapsibleContainer,
  ErrorsCollapsible,
  ErrorList,
  Error,
  ListItem,
  ListIcon,
} from './APIDesignRulesPane.styles'

const APIDesignRulesPane = ({ designRuleScores, totalScore, parentUrl }) => {
  const history = useHistory()

  const close = () => history.push(parentUrl)

  return (
    <Drawer closeHandler={close}>
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

        <DesignRulesList>
          {designRuleScores.results.map((rule, index) => (
            <ListItem>
              <ListIcon>
                {rule.success ? <CheckmarkCircle /> : <CrossCircle />}
              </ListIcon>
              <DesignRule key={index}>
                <DesignRuleTitle>{rule.name}</DesignRuleTitle>
                <DesignRuleDescription>
                  {rule.description}
                </DesignRuleDescription>
                <StyledLink
                  href={rule.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ga naar Design Rule
                  <ExternalIcon />
                </StyledLink>

                {rule.errors && rule.errors.length ? (
                  <CollapsibleContainer>
                    <ErrorsCollapsible
                      title={`${rule.errors.length} bevinding${
                        rule.errors.length > 1 ? 'en' : ''
                      } bij automatische test`}
                    >
                      <ErrorList>
                        {rule.errors.map((error, index) => (
                          <Error key={index}>{error}</Error>
                        ))}
                      </ErrorList>
                    </ErrorsCollapsible>
                  </CollapsibleContainer>
                ) : null}
              </DesignRule>
            </ListItem>
          ))}
        </DesignRulesList>
      </Drawer.Content>
    </Drawer>
  )
}

APIDesignRulesPane.propTypes = {
  designRuleScores: object.isRequired,
  totalScore: shape({
    points: number.isRequired,
    maxPoints: number.isRequired,
  }).isRequired,
  parentUrl: string.isRequired,
}

export default APIDesignRulesPane
