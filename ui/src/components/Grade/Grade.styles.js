// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

export const StyledCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.radius * 2}px;
  height: ${(p) => p.radius * 2}px;
  position: absolute;
  top: ${(p) => p.offset}px;
  left: ${(p) => p.offset}px;
  border-radius: 50%;
  background-color: ${(p) => p.backgroundColor};

  font-size: 13px;
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  color: ${(p) => p.textColor};

  ${(p) =>
    p.largeAtMediaQuery
      ? mq[p.largeAtMediaQuery]`
        width: ${(p) => p.largeRadius * 2}px;
        height: ${(p) => p.largeRadius * 2}px;
        top: ${(p) => p.largeOffset}px;
        left: ${(p) => p.largeOffset}px;
        font-size: 26px;
      `
      : ''}
`

export const StyledScoreSubscript = styled.span`
  padding-top: 4px;
  font-size: 9px;

  ${(p) =>
    p.largeAtMediaQuery
      ? mq[p.largeAtMediaQuery]`
      font-size: 18px;
      `
      : ''}
`
