import styled from 'styled-components'

export const StyledAPIFilter = styled.div`
  &:not(:last-child) {
    margin-bottom: ${(p) => p.theme.tokens.spacing09};
  }

  h2 {
    margin: 0 0 ${(p) => p.theme.tokens.spacing05};
    font-size: ${(p) => p.theme.tokens.fontSizeMedium};
    line-height: ${(p) => p.theme.tokens.lineHeightText};
    color: ${(p) => p.theme.tokens.colorPaletteGray900};
    font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  }
`
