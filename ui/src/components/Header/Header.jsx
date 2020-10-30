// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

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
  // StyledTopNavigationLink,
  StyledTopNavigationAnchor,
  StyledGitlabIcon,
  StyledTitle,
  StyledText,
  StyledPrimaryNavigation,
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
      name: 'Code',
      Icon: IconCode,
      to: '/code',
      'data-testid': 'nav-code',
    },
    {
      name: 'Events',
      Icon: IconEvents,
      to: '/events',
      'data-testid': 'nav-events',
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
            {/* <StyledNavigationListItem>
              <StyledTopNavigationLink to="/docs">Docs</StyledTopNavigationLink>
            </StyledNavigationListItem> */}
            <StyledNavigationListItem>
              <StyledTopNavigationAnchor href="https://gitlab.com/commonground/developer.overheid.nl">
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
