import styled from 'styled-components'

export const StyledPre = styled.pre`
  position: relative;
  margin-bottom: ${(p) => p.theme.tokens.spacing07};
  padding: 9px 48px 9px 14px;
  display: flex;
  white-space: pre-wrap;
  border: 1px solid ${(p) => p.theme.tokens.colors.colorPaletteGray300};
  border-radius: ${(p) => p.theme.tokens.spacing02};
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  background-color: ${(p) => p.theme.tokens.colors.colorPaletteGray100};
`

export const StyledCopyButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: ${(p) => p.theme.tokens.spacing03} ${(p) => p.theme.tokens.spacing04};
  display: flex;
  align-items: center;
  border: none;
  background-color: ${(p) => p.theme.tokens.colors.colorPaletteGray100};
  cursor: pointer;
`

export const StyledFeedback = styled.div`
  margin-right: ${(p) => p.theme.tokens.spacing02};
  padding: 0 ${(p) => p.theme.tokens.spacing02};
  background-color: ${(p) => p.theme.tokens.colors.colorPaletteGray100};
  font-family: 'Source Sans Pro', sans-serif;
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  font-weight: ${(p) => p.theme.tokens.fontWeightBold};
`
