// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { H3 } from '../../components/Headings/Headings'
import PageContentCard from '../../components/PageContentCard/PageContentCard'

export const StyledPageTitle = styled.h1`
  color: #212121;
  font-size: 2rem;
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
  margin: 0;
`

export const StyledPageDescription = styled.h2`
  color: #212121;
  font-size: 1.5rem;
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  margin-top: 10px;
`

export const StyledPageContentCard: any = styled(PageContentCard)`
  margin-top: 3rem;
  padding-top: 0;

  abbr {
    text-decoration: none;
    border-bottom: 1px dotted #a3aabf;
  }
`

export const StyledList = styled.ul`
  list-style-type: '- ';
`
export const StyledH3 = styled(H3)`
  font-weight: normal;
`

export const StyledP = styled.p`
  margin-bottom: 3rem;
`
