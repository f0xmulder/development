// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import Card from '../Card/Card'
import mq from '../../theme/mediaQueries'

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;

  ${mq.mdUp`
    flex-direction: row;
  `}
`

StyledCard.Title = styled.div`
  margin-bottom: ${(p) => p.theme.tokens.spacing02};
  font-size: ${(p) => p.theme.tokens.fontSizeLarge};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
  color: ${(p) => p.theme.colorText};
`

StyledCard.DateTime = styled.div`
  white-space: nowrap;
  color: ${(p) => p.theme.tokens.colorPaletteGray700};
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  margin: ${(p) => p.theme.tokens.spacing06};

  ${mq.mdUp`
    width: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${(p) => p.theme.colorText};
    margin: ${(p) => p.theme.tokens.spacing06} ${(p) =>
    p.theme.tokens.spacing07};
  `}
`

StyledCard.DateTime.DayOfWeek = styled.span`
  ${mq.mdUp`
    font-size: ${(p) => p.theme.tokens.fontSizeSmall};
    color: ${(p) => p.theme.tokens.colorPaletteGray700};
    margin-bottom: ${(p) => p.theme.tokens.spacing02};
  `}
`

StyledCard.DateTime.Day = styled.span`
  ${mq.mdUp`
    font-size: ${(p) => p.theme.tokens.fontSizeXXLarge};
    margin-bottom: ${(p) => p.theme.tokens.spacing02};
  `}
`

StyledCard.DateTime.Month = styled.span``

StyledCard.Body = styled.div`
  margin: ${(p) => p.theme.tokens.spacing01} ${(p) => p.theme.tokens.spacing06};

  ${mq.mdUp`
    margin: ${(p) => p.theme.tokens.spacing06};
    flex-grow: 1;
  `}
`

StyledCard.LinkContainer = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  margin: ${(p) => p.theme.tokens.spacing06};
`

StyledCard.Details = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${(p) => p.theme.tokens.spacing06};
  color: ${(p) => p.theme.tokens.colorPaletteGray600};
`

StyledCard.Details.Item = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  svg {
    margin-right: ${(p) => p.theme.tokens.spacing02};
  }
`

export const StyledLink = styled.a`
  text-decoration: none;
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  margin-right: ${(p) => p.theme.tokens.spacing03};
`
