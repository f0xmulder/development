import styled from 'styled-components'
import { Link } from 'react-router-dom'

import mq from '../../theme/mediaQueries'
import Grade from '../Grade/Grade'

export const StyledLink = styled(Link)`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 33.333% 33.333% 33.333%;
  align-items: center;
  grid-template-areas:
    'service service service'
    'organisation organisation organisation'
    'pill pill grade';
  padding: ${(p) => p.theme.tokens.spacing06};
  text-decoration: none;

  &:hover {
    background-color: ${(p) => p.theme.tokens.colors.colorPaletteGray100};
  }

  ${mq.smUp`
    grid-template-rows: auto auto;
    grid-template-columns: auto 150px 50px;
    grid-template-areas:
      "service pill grade"
      "organisation pill grade";
  `}
`

export const StyledServiceName = styled.div`
  grid-area: service;
  margin-bottom: ${(p) => p.theme.tokens.spacing02};
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
  color: ${(p) => p.theme.tokens.colors.colorText};
`

export const StyledOrganizationName = styled.div`
  grid-area: organisation;
  margin-bottom: ${(p) => p.theme.tokens.spacing03};
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  color: ${(p) => p.theme.tokens.colors.colorPaletteGray700};

  ${mq.smUp`
    margin-bottom: 0;
  `}
`

export const PillContainer = styled.div`
  grid-area: pill;

  ${mq.smUp`
    place-self: center;
  `}
`

export const StyledGrade = styled(Grade)`
  grid-area: grade;
  justify-self: end;

  ${mq.smUp`
    place-self: center;
  `}
`
