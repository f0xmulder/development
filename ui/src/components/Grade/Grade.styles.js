// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

export const StyledBorder = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 100%;

  background-color: ${(p) => gradeToColor(p.grade)};
  background-image: linear-gradient(
      ${(p) => gradeToDegrees(p.grade)}deg,
      transparent 50%,
      ${(p) =>
          p.grade <= 5
            ? p.theme.tokens.colorPaletteGray300
            : gradeToColor(p.grade)}
        50%
    ),
    linear-gradient(
      90deg,
      ${(p) => p.theme.tokens.colorPaletteGray300} 50%,
      transparent 50%
    );

  ${(p) =>
    p.largeAtMediaQuery
      ? mq[p.largeAtMediaQuery]`
      width: 110px;
      height: 110px;
      `
      : ''}
`

export const StyledCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  position: absolute;
  top: 3px;
  left: 3px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.tokens.colorBackground};

  font-size: 13px;
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  color: ${(p) => p.theme.tokens.colorPaletteGray700};

  ${(p) =>
    p.largeAtMediaQuery
      ? mq[p.largeAtMediaQuery]`
      width: 94px;
      height: 94px;
      top: 8px;
      left: 8px;
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

  .alwaysLarge & {
    font-size: 18px;
  }
`

export const gradeToColor = (grade) =>
  grade >= 8 ? '#63D19E' : grade >= 5 ? '#FEBF24' : '#F94747'

const gradeToDegrees = (grade) => {
  const degrees = grade * 36
  return degrees <= 180 ? degrees + 90 : degrees - 90
}
