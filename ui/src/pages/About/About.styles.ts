import styled from 'styled-components'

import PageContentCard, {
  PageContentCardType,
} from '../../components/PageContentCard/PageContentCard'

export const StyledAbout = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const StyledPageTitle = styled.h1`
  color: ${(p) => p.theme.color.text.normal};
  font-size: ${(p) => p.theme.font.size.title.large};
  line-height: ${(p) => p.theme.font.lineHeight.title.large};
  font-weight: ${(p) => p.theme.font.weight.bold};
  text-align: center;
  margin-bottom: 32px;
`

export const StyledPageContentCard = styled(PageContentCard)`
  abbr {
    text-decoration: none;
    border-bottom: 1px dotted #a3aabf;
  }
` as PageContentCardType
