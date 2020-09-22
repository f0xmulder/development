// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import mq from '../../theme/mediaQueries'

import AddIcon from '../../components/Icons/AddIcon'

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;

  ${mq.smDown`
    width: 100%;
  `}

  ${mq.smUp`
    padding-left: ${(p) => p.theme.tokens.spacing05};
  `}
`

export const TotalResults = styled.span``

export const StyledAddLinkMobile = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  ${mq.mdUp`
    display: none;
  `}
`

export const StyledAddIcon = styled(AddIcon)`
  height: ${(p) => p.theme.tokens.spacing05};
  margin-right: ${(p) => p.theme.tokens.spacing01};
`
