import styled from 'styled-components'

export const GradeSection = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(p) => p.theme.tokens.spacing06} 0;
  margin: ${(p) => `${p.theme.tokens.spacing06} -${p.theme.tokens.spacing08}`};
  background-color: ${(p) => p.theme.colorBackgroundSite};
`
