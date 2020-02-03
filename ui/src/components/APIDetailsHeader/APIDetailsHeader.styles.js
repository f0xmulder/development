import styled from 'styled-components'

import ArrowLeftIcon from '../Icons/ArrowLeft'

export const StyledAPIDetailsHeader = styled.div`
  @media screen and (min-width: 825px) {
    display: grid;
    grid-template-columns: 97px 1fr 97px;
  }
`

export const BackButton = styled.button`
  display: flex;
  align-self: flex-start;
  margin-top: 15px;
  margin-left: 15px;
  padding: 5px;
  border: none;
  font-size: ${(p) => p.theme.font.size.normal};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  cursor: pointer;
  color: ${(p) => p.theme.color.primary.normal};
  background: transparent;

  @media screen and (min-width: 576px) {
    margin-top: 0;
  }

  @media screen and (min-width: 825px) {
    margin-top: 24px;
  }
`

export const StyledArrowIcon = styled(ArrowLeftIcon)`
  margin-right: 3px;
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
