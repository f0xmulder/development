import styled from 'styled-components'

export const StyledAPIFilter = styled.div`
  &:not(:last-child) {
    margin-bottom: 24px;
  }

  h2 {
    margin: 0;
    font-size: ${(p) => p.theme.font.size.tiny};
    line-height: ${(p) => p.theme.font.lineHeight.tiny};
    color: ${(p) => p.theme.color.text.light};
    font-weight: ${(p) => p.theme.font.weight.semibold};
  }
`
