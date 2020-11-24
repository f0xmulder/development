// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import Checkmark from '../Checkmark'
import Cross from '../Cross'

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.size};
  height: ${(p) => p.size};
  background-color: ${(p) => p.color};
  border-radius: 50%;
`
// min-width: ${(p) => p.size};
// min-height: ${(p) => p.size};

export const StyledCheckmark = styled(Checkmark)`
  fill: ${(p) => p.theme.tokens.colorPaletteGray900};
  opacity: 0.5;
`

export const StyledCross = styled(Cross)`
  fill: ${(p) => p.theme.tokens.colorPaletteGray900};
  opacity: 0.5;
`
