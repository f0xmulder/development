import styled from 'styled-components'

export const StyledContent = styled.div`
  overflow-y: hidden;
  height: ${(p) => (p.isExpanded ? 'auto' : '86px')};
`

export const StyledToggleButton = styled.button`
  background: #f7f9fc;
  display: block;
  width: 100%;
  border: 1px solid #CAD0E0;
  border-radius: 3px;
  font-size: ${p => p.theme.font.size.tiny};
  line-height: ${p => p.theme.font.lineHeight.tiny};
  color: ${p => p.theme.color.text.light};
  font-weight: ${p => p.theme.font.weight.normal};
  text-align: center;
  margin-top: 5px;
  padding: 2px 0;
  cursor: pointer;
`
