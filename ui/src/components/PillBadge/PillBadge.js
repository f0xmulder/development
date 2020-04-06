// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

export default styled.span`
  padding: 4px 12px;
  border-radius: 25px;
  text-align: center;
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
  color: ${(p) => p.theme.colorText};
  background-color: ${(p) => p.theme.colorBackgroundButtonSecondary};
`
