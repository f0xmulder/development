import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import ArrowLeftIcon from '../Icons/ArrowLeft'

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
