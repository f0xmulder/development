// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import IconFlippingChevron from './IconFlippingChevron'

export const Wrapper = styled.div`
  & .ReactCollapse--collapse {
    transition: ${(p) => (p.animate ? 'height 300ms' : 'none')};
  }
  min-height: 55px;
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
  /* display: flex; */
  /* flex-direction: ${(p) => (p.isOpen ? 'column' : 'row')}; */
  /* align-items: center; */
  width: 100%;
  &:last-of-type {
    border-bottom: 1px solid #e0e0e0;
  }
`

export const CollapsibleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
`

export const CollapsibleTitle = styled.div`
  flex-grow: 1;
  margin-right: auto;
`

export const CollapsibleChevron = styled(IconFlippingChevron)`
  flex-grow: 0;
  transition: ${(p) => (p.animate ? '300ms ease-in-out' : 'none')};
  margin-left: auto;
`
