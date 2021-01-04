// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

export const GradeSection = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(p) => p.theme.tokens.spacing06} 0;
  margin: ${(p) => `${p.theme.tokens.spacing06} -${p.theme.tokens.spacing08}`};
  background-color: ${(p) => p.theme.colorBackgroundSite};
`

export const ScoreExplanation = styled.p`
  margin-bottom: ${(p) => p.theme.tokens.spacing06};
`
