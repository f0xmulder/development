import styled from 'styled-components'

export const StyledEnvironmentFormInputs = styled.div`
  margin-bottom: ${(p) => p.theme.tokens.spacing08};

  :last-child {
    margin-bottom: ${(p) => p.theme.tokens.spacing05};
  }
`

export const StyledEnvironmentHeading = styled.h3`
  margin: 0 0 ${(p) => p.theme.tokens.spacing06};
`
