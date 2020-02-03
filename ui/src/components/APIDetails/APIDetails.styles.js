import styled from 'styled-components'
import { Table } from '@commonground/design-system'
import TagList from '../TagList/TagList'
import availableIcon from './icons/available.svg'
import unavailableIcon from './icons/unavailable.svg'
import Card from '../Card/Card'

export const StyledAPIDetails = styled.div`
  width: 100%;
`

export const StyledTagList = styled(TagList)`
  display: inline-block;
`

export const CardsContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 80px;
  grid-template-rows: 100%;
  grid-template-columns: 1fr 280px;
  grid-column-gap: 20px;

  @media screen and (min-width: 768px) {
    display: grid;
  }
`

CardsContainer.Main = styled.div`
  grid-column-start: 1;
  grid-column-end: span 1;
  margin-bottom: 20px;
`

CardsContainer.SideBar = styled.div`
  grid-column-start: 2;
  grid-column-end: span 1;

  ${Card}:not(:last-child) {
    margin-bottom: 20px;
  }
`

export const StyledTable = styled(Table)`
  width: 100%;

  tbody td {
    background-color: #ffffff;
  }

  svg {
    margin-left: 5px;
  }
`

export const ApiLink = styled.a`
  font-weight: ${(p) => p.theme.font.weight.normal};
  color: ${(p) => p.theme.color.primary.normal};
  width: 100%;
`

export const StyledDl = styled.dl`
  overflow: hidden;
  margin: 0;

  dt {
    width: 120px;
    float: left;
    clear: both;
    line-height: ${(p) => p.theme.font.lineHeight.small};
    margin-bottom: 4px;
    font-weight: ${(p) => p.theme.font.weight.semibold};
    color: ${(p) => p.theme.color.text.light};
    font-size: 12px;
  }

  dd {
    margin-left: 0;
    line-height: ${(p) => p.theme.font.lineHeight.small};
    margin-bottom: 4px;
    float: left;
  }
`

export const StyledScoresUl = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  list-style-type: none;
`

export const StyledScoresLi = styled.li`
  padding-left: 30px;
  position: relative;

  &:before {
    content: '';
    width: 18px;
    height: 24px;
    left: 0;
    position: absolute;
    ${(p) =>
      p.available
        ? `background-image: url(${availableIcon});`
        : `background-image: url(${unavailableIcon});`}
    background-size: 18px;
    background-position: left center;
    background-repeat: no-repeat;
  }
`
