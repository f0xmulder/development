// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import StarIcon from '../../components/Icons/StarIcon.jsx'
import { ReactComponent as ChevronRight } from '../Icons/chevron-right.svg'
import { ReactComponent as History } from '../Icons/history.svg'
import { ReactComponent as Repository } from '../Icons/repository.svg'
import { ReactComponent as Snippet } from '../Icons/snippet.svg'

import mq from '../../theme/mediaQueries'

export const StyledCard = styled(Card)`
  margin: ${(p) => p.theme.tokens.spacing05} 0;
  padding: ${(p) => p.theme.tokens.spacing06};

  ${mq.mdDown`
    margin-bottom 0;
  `}
`

StyledCard.LinkContainer = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
`

export const StyledLink = styled.a`
  text-decoration: none;
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  margin-right: ${(p) => p.theme.tokens.spacing03};
`

StyledCard.Details = styled.div`
  color: ${(p) => p.theme.tokens.colorPaletteGray600};
`

StyledCard.StarsActivity = styled.div`
  display: flex;
  align-items: center;
  margin: 6px 0 8px;
`

StyledCard.RepositoryIcon = styled(Repository)`
  fill: ${(p) => p.theme.tokens.colorPaletteGray600};
  position: relative;
  top: 3px;
  width: 16px;
  height: 16px;
  margin-right: 2px;
`

StyledCard.SnippetIcon = styled(Snippet)`
  fill: ${(p) => p.theme.tokens.colorPaletteGray600};
  position: relative;
  top: 3px;
  width: 16px;
  height: 16px;
  margin-right: 2px;
`

StyledCard.Span = styled.span`
  margin-right: ${(p) => p.theme.tokens.spacing05};
`

StyledCard.StarIcon = styled(StarIcon)`
  position: relative;
  top: 3px;
`

StyledCard.PillContainer = styled.div`
  margin: 4px;
  display: inline-block;

  :first-child {
    margin-left: 0;
  }
`

StyledCard.APIs = styled.div`
  padding-top: ${(p) => p.theme.tokens.spacing06};
  color: ${(p) => p.theme.colorText};
`

StyledCard.APILink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`

StyledCard.ChevronRightIcon = styled(ChevronRight)`
  fill: ${(p) => p.theme.tokens.colorPaletteGray600};
`

StyledCard.HistoryIcon = styled(History)`
  fill: ${(p) => p.theme.tokens.colorPaletteGray600};
  width: 16px;
  height: 16px;
  margin-right: 4px;
`

StyledCard.APIContent = styled.div`
  flex-grow: 1;
`
