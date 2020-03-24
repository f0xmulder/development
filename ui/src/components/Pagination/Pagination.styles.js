import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

export const StyledPagination = styled.div`
  margin-top: ${(p) => p.theme.tokens.spacing10};
`

export const StyledPageButton = styled.button`
  width: 40px;
  height: 40px;
  margin-right: ${(p) => p.theme.tokens.spacing01};
  border: none;
  color: ${(p) => (p.current ? p.theme.colorTextInverse : p.theme.colorText)};
  background-color: ${(p) =>
    p.current ? p.theme.tokens.colorBrand3 : p.theme.tokens.colorBrand2};
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  cursor: ${(p) => (p.current ? 'default' : 'pointer')};
  user-select: none;

  &:hover {
    filter: brightness(90%);
  }

  ${mq.xs`
    width: 48px;
    height: 48px;
    display: none;
  `}
`

export const StyledArrowButton = styled(StyledPageButton)`
  &:disabled {
    color: ${(p) => p.theme.tokens.colorPaletteGray500};
    background-color: ${(p) => p.theme.tokens.colorPaletteGray200};
    filter: brightness(100%);
    cursor: default;
  }

  ${mq.xs`
    display: inline-block};
    margin-right: ${(p) => p.theme.tokens.spacing02};
  `}

  ${mq.smUp`
    margin-right: ${(p) => p.theme.tokens.spacing01};
  `}
`

export const StyledDottedButton = styled.div`
  width: 40px;
  height: 40px;
  margin-right: ${(p) => p.theme.tokens.spacing01};
  display: inline-block;
  border: none;
  text-align: center;
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  background-color: transparent;
  user-select: none;

  ${mq.xs`
    display: none;
  `}
`

export const StyledPageCount = styled.span`
  margin-left: ${(p) => p.theme.tokens.spacing03};

  ${mq.smUp`
    display: none;
  `}
`
