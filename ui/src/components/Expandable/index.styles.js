import styled from 'styled-components'

export const StyledContent = styled.div`
  overflow-y: hidden;
  height: ${(p) => (p.isExpanded ? 'auto' : '86px')};
`

export const StyledToggleButton = styled.button`
  background: #f7f9fc;
  display: block;
  width: 100%;
  line-height: 22px;
  border: 1px solid #cad0e0;
  border-radius: 3px;
  font-size: 12px;
  color: ${p => p.theme.color.text.light};
  font-weight: 400;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
`
