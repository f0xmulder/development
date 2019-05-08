import styled from 'styled-components'

export const StyledContent = styled.div`
  overflow-y: hidden;
  height: ${p => p.isExpanded ? 'auto' : '86px'};
`

export const StyledToggleButton = styled.button`
  display: block;
  width: 100%;
  line-height: 22px;
  border: 1px solid #CAD0E0;
  border-radius: 3px;
  font-size: 12px;
  color: #676D80;
  font-weight: 400;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
`

