import styled from 'styled-components'

import mq from '../../theme/mediaQueries'
import { Container } from '../design-system-candidates/Grid'

export const FooterArea = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${(p) => p.theme.tokens.footerHeight};
  background-color: ${(p) => p.theme.tokens.colors.footerBackgroundColor};

  ${mq.xs`
    height: ${(p) => p.theme.tokens.footerHeightMobile};
  `}
`

export const FooterContainer = styled(Container)`
  padding-top: ${(p) => p.theme.tokens.spacing09};

  ${mq.smDown`
    padding-top: ${(p) => p.theme.tokens.spacing05};
  `}
`

export const StyledText = styled.p`
  opacity: 0.6;
  color: white;
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
`

export const FooterImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;

  ${mq.xs`
    flex-direction: column;
  `}
`

export const StyledBZKLogo = styled.img`
  display: inline-block;
  width: 276px;
  height: 81px;

  /* 80% - Best in-between solution */
  ${mq.smDown`
    width: 220.8px;
    height: 64.8px;
  `}

  ${mq.xs`
    max-width: 100%;
    height: auto;
  `}
`

export const StyledVNGLogo = styled.img`
  width: 101px;
  height: 72px;
  margin-left: ${(p) => p.theme.tokens.spacing09};

  /* 80% - Best in-between solution */
  ${mq.smDown`
    width: 80.8px;
    height: 57.6px;
  `}

  ${mq.xs`
    margin-left: 0;
    margin-top: ${(p) => p.theme.tokens.spacing05};
  `}
`