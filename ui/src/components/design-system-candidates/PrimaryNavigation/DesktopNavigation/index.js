import React from 'react'
import { NavLink } from 'react-router-dom'

import primaryNavigationTypes from '../primaryNavigationTypes'
import { Wrapper, Container, Nav, List, ListItem } from './index.styles'

const DesktopNavigation = ({ items, ...props }) => (
  <Wrapper {...props} data-primary-nav-type="desktop">
    <Container>
      <Nav data-testid="primary-nav">
        <List data-testid="primary-nav-list">
          {items.map(({ name, to, exact, Icon, ...otherProps }) => (
            <ListItem key={to} data-testid="primary-nav-item">
              <NavLink to={to} exact={exact} {...otherProps}>
                {name}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Nav>
    </Container>
  </Wrapper>
)

DesktopNavigation.propTypes = { ...primaryNavigationTypes }

export default DesktopNavigation
