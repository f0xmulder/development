import styled from 'styled-components'
import TagListContainer from '../TagListContainer/TagListContainer'

export const Container = styled.div`
  max-width: 630px;
  padding: 60px 40px 0;
  margin: 0 auto;
`

export const PageTitle = styled.h1`
  color: ${(p) => p.theme.color.primary.normal};
  font-size: ${(p) => p.theme.font.size.title.normal};
  line-height: ${(p) => p.theme.font.lineHeight.title.normal};
  font-weight: ${(p) => p.theme.font.weight.bold};
  margin: 0 0 8px;
  text-align: center;
`

export const SubTitle = styled.h2`
  color: ${(p) => p.theme.color.text.light};
  font-size: ${(p) => p.theme.font.size.normal};
  line-height: ${(p) => p.theme.font.lineHeight.normal};
  font-weight: ${(p) => p.theme.font.weight.normal};
  margin: 0 0 40px;
  text-align: center;
`

export const SearchBox = styled.div`
  max-width: 380px;
  margin: 0 auto 40px;
`

export const StyledTagListContainer = styled(TagListContainer)`
  ul {
    justify-content: center;
  }
`
