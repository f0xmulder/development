import styled from 'styled-components'

import mq from './theme/mediaQueries'

export const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

export const ContentWrap = styled.div`
  padding-bottom: ${(p) => p.theme.tokens.footerHeight};

  ${mq.xs`
    padding-bottom: ${(p) => p.theme.tokens.footerHeightMobile};
  `}
`
