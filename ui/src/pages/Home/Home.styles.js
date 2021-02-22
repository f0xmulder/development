// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'
import { Container } from '../../components/design-system-candidates/Grid'
import Card from '../../components/Card/Card'
import { ReactComponent as ExternalIcon } from '../../components/Icons/chevron-right.svg'
import ArrowRight from '../../components/Icons/ArrowRight'

export const StyledHomePage = styled(Container)`
  flex-direction: column;
  margin-bottom: ${(p) => p.theme.tokens.spacing09};

  h2 {
    margin-bottom: ${(p) => p.theme.tokens.spacing04};
  }

  ${mq.smUp`
    margin-bottom: ${(p) => p.theme.tokens.spacing11};
  `}

  ${mq.smDown`
    h2 {
      margin-bottom: ${(p) => p.theme.tokens.spacing02};
    }
  `}
`

export const StyledHeading = styled.div`
  max-width: 728px;
  margin-bottom: ${(p) => p.theme.tokens.spacing08};
`

export const StyledCard = styled(Card)`
  max-width: 471px;
`

export const StyledExternalIcon = styled(ExternalIcon)`
  margin-left: ${(p) => p.theme.tokens.spacing04};
`

export const StyledInternalIcon = styled(ArrowRight)`
  margin-left: ${(p) => p.theme.tokens.spacing04};
`

export const Links = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: ${(p) => p.theme.tokens.spacing06};
  padding-right: ${(p) => p.theme.tokens.spacing06};
  margin-bottom: ${(p) => p.theme.tokens.spacing10};

  ${mq.smDown`
    ${StyledCard}:nth-child(2) {
      margin-top: ${(p) => p.theme.tokens.spacing05};
    }
    grid-template-columns: 100%;
    padding-right: 0;
  `}
`

export const Events = styled.div`
  display: flex;
  flex-direction: column;
  a:last-child {
    margin-left: auto;
    margin-right: ${(p) => p.theme.tokens.spacing04};
  }
`

export const StyledErrorMessage = styled.p`
  margin-top: ${(p) => p.theme.tokens.spacing05};
`
