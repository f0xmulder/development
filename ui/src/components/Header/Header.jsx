// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

import { GITLAB_REPO_URL } from '../../constants'
import IconHome from './assets/IconHome'
import IconPresent from './assets/IconPresent'
import IconCode from './assets/IconCode'
import IconEvents from './assets/IconEvents'
import IconInfo from './assets/IconInfo'
import {
  HeaderArea,
  HeaderContainer,
  TopNavigationArea,
  TopNavigationContainer,
  StyledNavigationList,
  StyledNavigationListItem,
  StyledTopNavigationAnchor,
  StyledGitlabIcon,
  StyledTitle,
  StyledText,
  StyledPrimaryNavigation,
  StyledTopNavigationAnchorActive,
} from './Header.styles'

const Header = () => {
  const navItems = [
    {
      name: 'Home',
      Icon: IconHome,
      to: '/',
      exact: true,
      'data-testid': 'nav-home',
    },
    {
      name: "API's",
      Icon: IconPresent,
      to: '/apis',
      'data-testid': 'nav-apis',
    },
    {
      name: 'Events',
      Icon: IconEvents,
      to: '/events',
      'data-testid': 'nav-events',
    },
    {
      name: 'Code',
      Icon: IconCode,
      to: '/code',
      'data-testid': 'nav-code',
    },
    {
      name: 'Over',
      Icon: IconInfo,
      to: '/about',
      'data-testid': 'nav-about',
    },
  ]

  return (
    <HeaderArea>
      <TopNavigationArea aria-label="Gerelateerde websites">
        <TopNavigationContainer>
          <StyledNavigationList>
            <StyledNavigationListItem>
              <StyledTopNavigationAnchorActive href="https://developer.overheid.nl">
                Developer
              </StyledTopNavigationAnchorActive>
            </StyledNavigationListItem>
            <StyledNavigationListItem>
              <StyledTopNavigationAnchor href="https://forum.developer.overheid.nl">
                Forum
              </StyledTopNavigationAnchor>
            </StyledNavigationListItem>
            <StyledNavigationListItem>
              <StyledTopNavigationAnchor href={GITLAB_REPO_URL}>
                <StyledGitlabIcon />
                GitLab
              </StyledTopNavigationAnchor>
            </StyledNavigationListItem>
          </StyledNavigationList>
        </TopNavigationContainer>
      </TopNavigationArea>

      <HeaderContainer>
        <StyledTitle>Developer Overheid</StyledTitle>
        <StyledText>Ontwikkelen voor de overheid doen we samen</StyledText>
      </HeaderContainer>

      <StyledPrimaryNavigation
        items={navItems}
        aria-label="Website navigatie"
      />
    </HeaderArea>
  )
}

export default Header
