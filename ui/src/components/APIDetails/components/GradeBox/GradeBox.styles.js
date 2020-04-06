// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import mq from '../../../../theme/mediaQueries'
import Grade from '../../../Grade/Grade'

export const GradeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${(p) => p.theme.tokens.spacing07} 0;

  ${mq.smUp`
    flex-direction: column;
    margin: 0;
  `}
`

export const GradeHeader = styled.strong`
  display: none;

  ${mq.smUp`
    display: inline;
    text-align: center;
  `}
`

export const StyledGrade = styled(Grade)`
  ${mq.smUp`
    margin: ${(p) => p.theme.tokens.spacing05} auto;
  `}
`

export const StyledLinkMobile = styled(Link)`
  margin-left: 1rem;
  text-align: center;
  text-decoration: none;

  ${mq.smUp`
    display: none;
  `}
`

export const StyledLink = styled(Link)`
  display: none;
  text-align: center;

  ${mq.smUp`
    display: inline;
  `}
`
