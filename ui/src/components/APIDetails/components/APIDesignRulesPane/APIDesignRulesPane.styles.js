// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Collapsible } from '@commonground/design-system'

import External from '../../../Icons/External'
import availableIcon from '../../icons/available.svg'
import unavailableIcon from '../../icons/unavailable.svg'

export const GradeSection = styled.div``

export const IntroSection = styled.p``

export const StyledLink = styled.a`
  text-decoration: none;
`

export const ExternalIcon = styled(External)`
  margin-left: ${(p) => p.theme.tokens.spacing03};
`

export const DesignRulesList = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  list-style-type: none;
`

export const DesignRule = styled.li`
  padding-left: 30px;
  position: relative;

  &:before {
    content: '';
    width: 18px;
    height: 24px;
    left: 0;
    position: absolute;
    ${(p) =>
      p.success
        ? `background-image: url(${availableIcon});`
        : `background-image: url(${unavailableIcon});`}
    background-size: 18px;
    background-position: left center;
    background-repeat: no-repeat;
  }
`

export const DesignRuleTitle = styled.div``

export const DesignRuleDescription = styled.div``

export const StyledDesignRulesTitle = styled.h4`
  margin: 20px 0 5px 0;
`

export const ErrorsCollapsible = styled(Collapsible)``

export const ErrorList = styled.ul``

export const Error = styled.li`
  list-style-type: none;
`
