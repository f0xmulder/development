import React from 'react'
import StyledHeader, { StyledTitle, StyledNavigation } from './index.styles'
import {Navigation} from '@commonground/design-system'
import {NavLink} from 'react-router-dom'

const PlusIcon = ({ ...props }) =>
  <svg viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8 5H5v3H3V5H0V3h3V0h2v3h3z" fill="#FFF" fillRule="evenodd"/>
  </svg>

PlusIcon.defaultProps = {
  width: '8px',
  height: '8px'
}

export default () =>
  <StyledHeader>
    <StyledTitle to="/">developer.overheid.nl</StyledTitle>

    <StyledNavigation>
     <Navigation.Item><NavLink to="/overzicht">Overzicht</NavLink></Navigation.Item> 
     <Navigation.Item><NavLink to="/api-toevoegen">API toevoegen</NavLink></Navigation.Item> 
     <Navigation.Item><NavLink to="/over">Over</NavLink></Navigation.Item> 
    </StyledNavigation>
  </StyledHeader>

