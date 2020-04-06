// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Button } from '@commonground/design-system'

import mq from '../../theme/mediaQueries'
import { Container } from '../../components/design-system-candidates/Grid'
import Card from '../../components/Card/Card'
import externalIcon from '../../components/Icons/chevron-right.svg'

export const StyledHomePage = styled(Container)`
  flex-direction: column;
  margin-bottom: ${(p) => p.theme.tokens.spacing09};

  ${mq.smUp`
    margin-bottom: ${(p) => p.theme.tokens.spacing11};
  `}
`

export const StyledHeading = styled.div`
  max-width: 728px;
  margin-bottom: ${(p) => p.theme.tokens.spacing08};
`

export const StyledCard = styled(Card)`
  max-width: 471px;
`

export const StyledIconButton = styled(Button)`
  &:after {
    height: 20px;
    margin-left: ${(p) => p.theme.tokens.spacing04};
    content: url(${externalIcon});
  }
`
