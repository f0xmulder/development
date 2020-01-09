import styled, { AnyStyledComponent } from 'styled-components'
import TagList from '../TagList/TagList'
import availableIcon from './icons/available.svg'
import unavailableIcon from './icons/unavailable.svg'
import Card from '../Card/Card'

export const StyledAPIDetails = styled.div`
  width: 100%;
`

export const PageTitle = styled.h1`
  color: ${(p) => p.theme.color.text.normal};
  font-size: ${(p) => p.theme.font.size.title.large};
  line-height: ${(p) => p.theme.font.lineHeight.title.large};
  font-weight: ${(p) => p.theme.font.weight.bold};
  margin-bottom: 0;
  text-align: center;
`

export const SubTitle = styled.h2`
  color: ${(p) => p.theme.color.text.light};
  font-size: ${(p) => p.theme.font.size.normal};
  line-height: ${(p) => p.theme.font.lineHeight.normal};
  font-weight: ${(p) => p.theme.font.weight.normal};
  margin: 0 0 24px;
  text-align: center;
`

export const DocumentationContainer = styled.p`
  text-align: center;
`

export const DocumentationButton = styled.a`
  display: inline;
  margin: 0 auto;
  color: ${(p) => p.theme.color.primary.normal};
  font-size: ${(p) => p.theme.font.size.small};
  padding: 6px 12px 8px 12px;
  border: 2px solid ${(p) => p.theme.color.primary.normal};
  border-radius: 5px;
  font-weight: ${(p) => p.theme.font.weight.semibold};
  background: transparent;
  text-decoration: none;

  svg {
    vertical-align: middle;
    margin-left: 5px;
  }
`

export const StyledTagList = styled(TagList)`
  display: inline-block;
`

export type CompoundCardsContainer = AnyStyledComponent

export const CardsContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 80px;
  grid-template-rows: 100%;
  grid-template-columns: 1fr 280px;
  grid-column-gap: 20px;

  @media screen and (min-width: 768px) {
    display: grid;
  }
` as CompoundCardsContainer

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

export const ApiLink = styled.a`
  font-weight: ${(p) => p.theme.font.weight.semibold};
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

export const StyledScoresLi = styled.li<{ available: boolean }>`
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
