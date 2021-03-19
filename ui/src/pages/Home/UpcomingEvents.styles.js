// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//

import styled from 'styled-components'

export const Events = styled.div`
  display: flex;
  flex-direction: column;
  a:last-child {
    margin-left: auto;
    margin-right: ${(p) => p.theme.tokens.spacing04};
  }
`
