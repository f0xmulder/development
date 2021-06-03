// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
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

export const StyledPageContentCard = styled(PageContentCard)`
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

export const StyledH2 = styled.h2`
  &:first-of-type {
    margin: ${(p) =>
      `${p.theme.tokens.spacing09} 0 ${p.theme.tokens.spacing05}`};
  }
  margin: ${(p) => `${p.theme.tokens.spacing07} 0 ${p.theme.tokens.spacing05}`};
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  font-size: ${(p) => p.theme.tokens.fontSizeXLarge};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  color: ${(p) => p.theme.colorText};
`

export const StyledH3 = styled.h3`
  margin: ${(p) => p.theme.tokens.spacing05} 0;
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  font-size: ${(p) => p.theme.tokens.fontSizeLarge};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  color: ${(p) => p.theme.colorText};
`
