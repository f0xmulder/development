// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

export const StyledCard = styled.div`
  width: auto;
  margin: ${(p) => p.theme.tokens.spacing07} -${(p) => p.theme.tokens.spacing05};
  border-radius: 4px;
  background-color: ${(p) => p.theme.tokens.colorBackground};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);

  ${mq.smUp`
    margin-left: 0;
    margin-right: 0;
  `}
`

export const Body = styled.div`
  padding: ${(p) => p.theme.tokens.spacing06};
`

export const Footer = styled(Body)`
  border-top: 1px solid #f0f2f7;
`

export const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
`
