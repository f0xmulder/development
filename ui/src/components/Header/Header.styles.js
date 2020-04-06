// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'

import mq from '../../theme/mediaQueries'
import { Container } from '../design-system-candidates/Grid'
import PrimaryNavigation from '../design-system-candidates/PrimaryNavigation'
import { ReactComponent as GitlabIcon } from '../Icons/gitlab-white-icon.svg'

export const HeaderArea = styled.header`
  margin-bottom: ${(p) => p.theme.tokens.spacing09};
  overflow: hidden;
  background-color: ${(p) => p.theme.tokens.colorBrand3};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.24),
    0px 5px 10px 0px rgba(0, 0, 0, 0.24);

  ${mq.smUp`
    margin-bottom: ${(p) => p.theme.tokens.spacing11};
  `}
`

export const TopNavigationArea = styled.nav`
  background-color: rgba(0, 0, 0, 0.3);
`

export const TopNavigationContainer = styled(Container)`
  height: ${(p) => p.theme.headerTopNavigationHeight};
`

export const HeaderContainer = styled(Container)`
  margin-top: ${(p) => p.theme.tokens.spacing07};
  margin-bottom: ${(p) => p.theme.tokens.spacing07};

  ${mq.smUp`
    margin-top: ${(p) => p.theme.tokens.spacing09};
    margin-bottom: ${(p) => p.theme.tokens.spacing09};
  `}
`

export const StyledNavigationList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
`

export const StyledNavigationListItem = styled.li`
  height: 100%;

  :not(:last-child) {
    margin-right: 8px;
  }
`

export const StyledTopNavigationLink = styled(Link)`
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.colorTextInverse};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const StyledTopNavigationAnchor = styled.a`
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.colorTextInverse};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${(p) => p.theme.colorTextInverse};
    background-color: rgba(0, 0, 0, 0.2);
  }
`

export const StyledGitlabIcon = styled(GitlabIcon)`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`

export const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: ${(p) => p.theme.tokens.spacing03};
  color: ${(p) => p.theme.colorTextInverse};
  font-size: ${(p) => p.theme.tokens.fontSizeXLarge};
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};

  ${mq.smUp`
    font-size: ${(p) => p.theme.tokens.fontSizeXXLarge};
  `}
`

export const StyledText = styled.p`
  color: ${(p) => p.theme.colorTextInverse};
  font-size: ${(p) => p.theme.tokens.fontSizeLarge};
`

export const StyledBottomNavigationLink = styled(NavLink)`
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.colorTextInverse};
  font-size: ${(p) => p.theme.tokens.fontSizeLarge};
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.2);
  }

  &.active {
    box-sizing: border-box;
    padding-top: 4px;
    border-bottom: 4px solid white;
  }
`

export const StyledPrimaryNavigation = styled(PrimaryNavigation)`
  &[data-primary-nav-type='desktop'] {
    nav {
      margin-left: -${(p) => p.theme.tokens.spacing06};
    }

    li {
      font-size: ${(p) => p.theme.tokens.fontSizeLarge};

      a {
        color: ${(p) => p.theme.colorTextInverse};

        &:active,
        &.active {
          padding-bottom: calc(${(p) => p.theme.tokens.spacing05} - 4px);
          border-bottom: 4px solid white;
          color: ${(p) => p.theme.colorTextInverse};
          background: ${(p) => p.theme.tokens.colorBrand3};
        }

        &:hover,
        &:focus {
          text-decoration: underline;
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
`
