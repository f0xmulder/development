import styled from 'styled-components'

export const PageTitle = styled.h1`
  color: ${(p) => p.theme.color.text.normal};
  font-size: ${(p) => p.theme.font.size.title.normal};
  line-height: ${(p) => p.theme.font.lineHeight.title.normal};
  font-weight: ${(p) => p.theme.font.weight.bold};
  margin: 0;
`

export const SubTitle = styled.h2`
  color: ${(p) => p.theme.color.text.light};
  font-size: ${(p) => p.theme.font.size.normal};
  line-height: ${(p) => p.theme.font.lineHeight.normal};
  font-weight: ${(p) => p.theme.font.weight.normal};
  margin: 0 0 24px;
`
