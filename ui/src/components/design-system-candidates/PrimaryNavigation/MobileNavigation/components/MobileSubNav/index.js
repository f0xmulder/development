// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React, { useRef, useEffect } from 'react'

import primaryNavigationTypes from '../../../primaryNavigationTypes'
import IconChevron from '../IconChevron'

import {
  Wrapper,
  Header,
  CloseButton,
  List,
  ListItem,
  StyledLink,
} from './index.styles'

const MobileSubNavigation = ({ items, closeFunction }) => {
  const refList = useRef()
  const closeDelayed = () => setTimeout(() => closeFunction(), 200)

  useEffect(() => {
    if (refList.current) refList.current.firstChild.firstChild.focus()
  })

  return (
    <Wrapper data-testid="mobile-subnav">
      <Header>
        <CloseButton onClick={closeFunction} />
      </Header>

      <List ref={refList}>
        {items.map(({ name, to }) => (
          <ListItem key={name}>
            <StyledLink to={to} onClick={closeDelayed}>
              {name}
              <IconChevron />
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </Wrapper>
  )
}

MobileSubNavigation.propTypes = { ...primaryNavigationTypes }

export default MobileSubNavigation
