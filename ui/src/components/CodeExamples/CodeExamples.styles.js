// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { H1 } from '../Headings/Headings'
import ExternalIcon from '../Icons/External'
import { ReactComponent as History } from '../Icons/history.svg'
import mq from '../../theme/mediaQueries'

export const CodeExamplesContainer = styled.div``
export const StyledH1 = styled(H1)`
  margin-bottom: 1px;
`
export const StyledList = styled.div`
  padding: 0;
`

export const StyledListItem = styled.a`
  padding: ${(p) => p.theme.tokens.spacing06} ${(p) => p.theme.tokens.spacing03};
  text-decoration: none;
  color: ${(p) => p.theme.colorText};

  &:hover {
    background-color: ${(p) => p.theme.tokens.colorPaletteGray100};
  }

  &:hover,
  &:active {
    color: ${(p) => p.theme.colorText};
  }

  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 1fr 2fr auto;
  grid-template-areas:
    'icon title .'
    'icon description link'
    '. tags tags';

  min-height: 153px;
  border-bottom: 1px solid ${(p) => p.theme.tokens.colorPaletteGray300};
  ${mq.xs`
    grid-template-columns: 30px auto 30px;
  `}
`

export const IconContainer = styled.div`
  grid-area: icon;
  align-self: center;
  justify-self: center;
  width: ${(p) => p.theme.tokens.spacing07};
  height: ${(p) => p.theme.tokens.spacing07};
  ${mq.xs`
    width: ${(p) => p.theme.tokens.spacing06};
    height: ${(p) => p.theme.tokens.spacing06};
  `}
`

export const StyledExternalIcon = styled(ExternalIcon)`
  grid-area: link;
  justify-items: end;
  align-self: center;
  margin-left: auto;
`

export const StyledTitle = styled.span`
  grid-area: title;
  align-self: center;
  font-weight: 600;
  color: #0b71a1;
`
export const StyledDescription = styled.small`
  grid-area: description;
  align-self: center;
  display: flex;
  align-items: center;
  > * {
    &:nth-child(2) {
      margin-left: ${(p) => p.theme.tokens.spacing02};
    }
    &:nth-child(3) {
      margin-left: ${(p) => p.theme.tokens.spacing05};
    }
  }
  ${mq.xs`
    > * {
      &:nth-child(2) {
        margin-left: ${(p) => p.theme.tokens.spacing01};
      }
      &:nth-child(3) {
        margin-left: 0;
      }
    }
  `}
`
export const StyledTags = styled.div`
  grid-area: tags;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-template-rows: auto;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  > * {
    padding: 0;
  }
  ${mq.md`
    grid-template-columns: minmax(0,100px) minmax(0,100px) minmax(0,100px) minmax(0,100px) minmax(0,100px);
  `}
  ${mq.xs`
    grid-template-columns: minmax(0,100px) minmax(0,100px) minmax(0,100px);
    grid-column-gap: 4px;
    grid-row-gap: 4px;
  `}
`

export const HistoryIcon = styled(History)`
  fill: ${(p) => p.theme.tokens.colorPaletteGray600};
  width: 16px;
  height: 16px;
  margin-right: 4px;
`

export const StyledStarsCount = styled.span`
  min-width: 1rem;
`
export const StyledLastCommitMessage = styled.span``
