// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import ArrowLeftIcon from '../Icons/ArrowLeft'
import ExternalIcon from '../Icons/External'

const ButtonStyling = css`
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  margin-bottom: ${(p) => p.theme.tokens.spacing07};
  font-family: 'Source Sans Pro', sans-serif;
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  background: transparent;
  color: ${(p) => p.theme.colorTextLink};
  cursor: pointer;
`

export const BackButton = styled.button`
  ${ButtonStyling}
`

export const BackLink = styled(Link)`
  ${ButtonStyling}
`

export const StyledArrowIcon = styled(ArrowLeftIcon)`
  margin-right: 3px;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SpecLink = styled.a`
  text-decoration: none;
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};

  display: inline-flex;
  align-items: center;
  margin: ${(p) => `${p.theme.tokens.spacing07} 0 ${p.theme.tokens.spacing05}`};

  & span {
    line-height: 1 rem;
  }
`

export const StyledExternalIcon = styled(ExternalIcon)`
  height: 1rem;
  margin-left: ${(p) => p.theme.tokens.spacing02};
`
