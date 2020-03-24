import styled from 'styled-components'
import { Link } from 'react-router-dom'

import mq from '../../theme/mediaQueries'
import { Container } from '../../components/design-system-candidates/Grid'
import Card from '../../components/Card/Card'
import externalIcon from '../../components/Icons/chevron-right.svg'

export const StyledHomePage = styled(Container)`
  flex-direction: column;
  margin-bottom: ${(p) => p.theme.tokens.spacing09};

  ${mq.smUp`
    margin-bottom: ${(p) => p.theme.tokens.spacing11};
  `}
`

export const StyledHeading = styled.div`
  max-width: 728px;
  margin-bottom: ${(p) => p.theme.tokens.spacing08};
`

export const StyledCard = styled(Card)`
  max-width: 471px;
`

export const StyledIconButton = styled(Link)`
  width: auto;
  height: 40px;
  padding-left: ${(p) => p.theme.tokens.spacing06};
  padding-right: ${(p) => p.theme.tokens.spacing03};
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  border: none;
  border-radius: 4px;
  color: ${(p) => p.theme.colorText};
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  text-decoration: none;
  background-color: ${(p) => p.theme.colorBackgroundButtonPrimary};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.32);

  &:hover {
    filter: brightness(90%);
  }

  &:after {
    height: 20px;
    margin-left: ${(p) => p.theme.tokens.spacing04};
    content: url(${externalIcon});
  }
`
