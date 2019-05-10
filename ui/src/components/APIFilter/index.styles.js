import styled from 'styled-components'

export const StyledAPIFilter = styled.div`
  &:not(:last-child) {
    margin-bottom: 24px;
  }

  h2 {
    margin: 0;
    font-size: 12px;
    color: ${p => p.theme.color.text.light};
    font-weight: 600;
  }
`
