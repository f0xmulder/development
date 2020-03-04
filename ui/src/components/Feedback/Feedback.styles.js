import styled from 'styled-components'

import mq from '../../theme/mediaQueries'
import { Container } from '../design-system-candidates/Grid'
import gitlabIcon from '../Icons/gitlab-black-icon.svg'
import externalIcon from '../Icons/external-icon.svg'

export const FeedbackArea = styled.div`
  background-color: ${(p) => p.theme.tokens.colors.colorBackground};
`

export const FeedbackContainer = styled(Container)`
  padding-top: ${(p) => p.theme.tokens.spacing09};
  padding-bottom: ${(p) => p.theme.tokens.spacing09};

  ${mq.smUp`
    padding-top: ${(p) => p.theme.tokens.spacing11};
    padding-bottom: ${(p) => p.theme.tokens.spacing11};
  `}
`

export const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${(p) => p.theme.tokens.spacing05};
  font-weight: ${(p) => p.theme.tokens.fontWeightRegular};
`

export const StyledText = styled.p`
  margin-top: 15px;
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
`

export const StyledIconButton = styled.a`
  width: auto;
  height: 40px;
  margin-top: ${(p) => p.theme.tokens.spacing05};
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  color: ${(p) => p.theme.tokens.colors.colorText};
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  text-decoration: none;
  background-color: ${(p) => p.theme.tokens.colors.colorButtonSecondary};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.32);

  &:hover {
    filter: brightness(90%);
  }

  &:before {
    height: 20px;
    margin-right: ${(p) => p.theme.tokens.spacing06};
    content: url(${gitlabIcon});
  }

  &:after {
    height: 20px;
    margin-left: ${(p) => p.theme.tokens.spacing06};
    content: url(${externalIcon});
  }
`
