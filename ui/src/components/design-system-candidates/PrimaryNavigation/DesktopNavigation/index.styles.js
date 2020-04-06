// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import Color from 'color'

import mq from '../../../../theme/mediaQueries'
import { Container as GridContainer } from '../../Grid'

export const Wrapper = styled.div`
  background-color: ${(p) => p.theme.tokens.colorBrand3};
`

export const Container = styled(GridContainer)`
  ${mq.xs`
    display: none;
  `}
`

export const Nav = styled.nav``

export const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
`

export const ListItem = styled.li`
  a {
    padding: ${(p) =>
      `${p.theme.tokens.spacing05} ${p.theme.tokens.spacing06}`};
    color: ${(p) => p.theme.colorText};
    font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
    text-decoration: none;

    &:active,
    &.active {
      color: ${(p) => p.theme.colorText};
      background: ${(p) =>
        Color(p.theme.tokens.colorBackground).alpha(0.5).hsl().string()};
    }
  }

  &:last-child {
    padding-right: 0;
  }

  a {
    display: inline-block;
  }
`
