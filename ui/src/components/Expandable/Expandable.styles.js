import styled from 'styled-components'

export const StyledContent = styled.div`
  overflow-y: hidden;
  height: ${(p) => (p.isExpanded ? 'auto' : '500px')};
`

export const StyledToggleButton = styled.button`
  padding: 12px 10px;
  border: none;
  background-color: transparent;
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  color: ${(p) => p.theme.colorTextLink};
  text-align: left;
  cursor: pointer;
`
