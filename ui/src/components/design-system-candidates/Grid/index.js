// Box uses `themes.breakpoints` for the `width={[1, 1/2]}` array
import { Flex, Box } from 'reflexbox/styled-components'
import styled from 'styled-components/macro'

export const Container = styled.div`
  width: 100%;
  max-width: ${(p) => p.theme.tokens.containerWidth};
  padding: 0 ${(p) => p.theme.tokens.containerPadding};
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
