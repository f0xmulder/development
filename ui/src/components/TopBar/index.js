import React from 'react'
import StyledHeader, { StyledTitle, StyledNavigation } from './index.styles'
import {Navigation} from '@commonground/design-system'
import {NavLink} from 'react-router-dom'

export default () =>
  <StyledHeader>
    <StyledTitle to="/">developer.overheid.nl</StyledTitle>

    <StyledNavigation>
     <Navigation.Item><NavLink to="/overzicht">Overzicht</NavLink></Navigation.Item> 
     <Navigation.Item><NavLink to="/api-toevoegen">API toevoegen</NavLink></Navigation.Item> 
     <Navigation.Item><NavLink to="/over">Over</NavLink></Navigation.Item> 
    </StyledNavigation>
  </StyledHeader>

