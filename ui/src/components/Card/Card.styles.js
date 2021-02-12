// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

export const StyledCard = styled.div`
  width: auto;
  border-radius: 4px;
  background-color: ${(p) => p.theme.tokens.colorBackground};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);

  ${mq.smUp`
    margin-left: 0;
    margin-right: 0;
  `}
  ${mq.smDown`
    min-width: 100%;
  `}
`

export const Body = styled.div`
  padding: ${(p) => p.theme.tokens.spacing06};
  padding-top: 0;
  ${mq.smDown`
    padding: ${(p) => p.theme.tokens.spacing05};
  `}
`

export const Footer = styled(Body)`
  border-top: 1px solid #f0f2f7;
`

export const Title = styled.p`
  font-size: 18px;
  font-weight: 600;
`

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    flex-shrink: 0;
    width: 100%;
  }
`
