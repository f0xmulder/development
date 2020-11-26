// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Collapsible } from '@commonground/design-system'

import External from '../../../Icons/External'
import availableIcon from '../../icons/available.svg'
import unavailableIcon from '../../icons/unavailable.svg'

export const GradeSection = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(p) => p.theme.tokens.spacing06} 0;
  margin: ${(p) => `${p.theme.tokens.spacing06} -${p.theme.tokens.spacing08}`};
  background-color: ${(p) => p.theme.colorBackgroundSite};
`

export const IntroSection = styled.div``

export const StyledLink = styled.a``

export const ExternalIcon = styled(External)`
  margin-left: ${(p) => p.theme.tokens.spacing03};
`

export const DesignRulesList = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  list-style-type: none;
`

export const DesignRule = styled.li`
  margin-top: ${(p) => p.theme.tokens.spacing07};
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

export const DesignRuleTitle = styled.div`
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
`

export const DesignRuleDescription = styled.div`
  margin: ${(p) => p.theme.tokens.spacing03} 0px;
`
export const CollapsibleContainer = styled.div`
  border: solid ${(p) => p.theme.tokens.colorPaletteGray400};
  border-width: 1px 0px;
  padding: ${(p) => p.theme.tokens.spacing04} 0px;
  margin-top: ${(p) => p.theme.tokens.spacing06};
`

export const ErrorsCollapsible = styled(Collapsible)``

export const ErrorList = styled.ul`
  margin-top: ${(p) => p.theme.tokens.spacing05};
`

export const Error = styled.li`
  list-style-type: none;
  color: ${(p) => p.theme.colorAlertError};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
  margin-bottom: ${(p) => p.theme.tokens.spacing03};
`
