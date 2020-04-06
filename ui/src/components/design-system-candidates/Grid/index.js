// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { Flex, Box } from 'reflexbox/styled-components'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: ${(p) => p.theme.containerWidth};
  padding: 0 ${(p) => p.theme.containerPadding};
  margin: 0 auto;
`

export const Row = styled(Flex)`
  flex-wrap: wrap;
  margin: 0 -${(p) => p.theme.tokens.spacing05};
`

export const Col = styled(Box)`
  flex: 0 1 auto;
  padding: 0 ${(p) => p.theme.tokens.spacing05};
`
