import React from 'react'
import StyledHeader, { StyledButton, StyledLink, StyledNavigation } from './index.styles'
import {Navigation} from '@commonground/design-system'
import {Link} from 'react-router-dom'

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
    <StyledButton to="/api-toevoegen">
      <PlusIcon /> Voeg API toe
    </StyledButton>
    <StyledNavigation>
     <Navigation.Item><Link to="/overzicht">Overzicht</Link></Navigation.Item> 
     <Navigation.Item><Link to="/api-toevoegen">API toevoegen</Link></Navigation.Item> 
     <Navigation.Item><Link to="/over">Over</Link></Navigation.Item> 
    </StyledNavigation>
  </StyledHeader>

