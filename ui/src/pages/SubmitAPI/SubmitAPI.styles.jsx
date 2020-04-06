// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

export const StyledSubmitAPI = styled.div`
  max-width: ${(p) => p.theme.containerWidth};
  margin: 0 auto 100px;
  padding: 0 ${(p) => p.theme.containerPadding};
`

export const StyledTabs = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-top: 40px;

  & > a {
    flex: 0 1 auto;
    padding: 11px ${(p) => p.theme.tokens.spacing05};
    font-size: ${(p) => p.theme.tokens.fontSizeMedium};
    line-height: ${(p) => p.theme.tokens.lineHeightText};
    color: ${(p) => p.theme.colorTextLink};
    text-decoration: none;

    &.active {
      font-weight: ${(p) => p.theme.tokens.fontWeightBold};
      color: ${(p) => p.theme.colorText};
      background-color: ${(p) => p.theme.tokens.colorBackground};
      border-radius: 4px 4px 0 0;
      box-shadow: 0 8px 0 0 rgb(255, 255, 255), 0 0 2px 0 rgba(0, 0, 0, 0.12),
        0 2px 2px 0 rgba(0, 0, 0, 0.24);
    }
  }
`
