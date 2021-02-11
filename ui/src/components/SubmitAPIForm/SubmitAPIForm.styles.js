// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

export const StyledFormGroupColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (min-width: 688px) {
    margin: 0 -28px;
  }
`

export const StyledFormGroupColumn = styled.div`
  flex: 1 0 100%;
  padding: 0;

  @media screen and (min-width: 688px) {
    padding: 0 28px;
    flex: 1 1 50%;
  }
`

export const StyledFormGroup = styled.div`
  margin-bottom: 1rem;
`

export const StyledFormSetting = styled.div`
  display: flex;

  label {
    flex: 0 1 auto;
    order: 2;
    margin-bottom: 0;
    cursor: pointer;
    user-select: none;
  }
`

export const HelperMessage = styled.small`
  display: block;
  margin-bottom: ${(p) => p.theme.tokens.spacing02};
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};
  line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  color: ${(p) => p.theme.colorTextLabel};
`

export const SelectFieldLoading = styled.div`
  background-color: ${(p) => `1px solid ${p.theme.colorBackgroundInput}`};
  background: url(/static/media/arrow-down-solid-icon.cc2fbbbb.svg) right center
    no-repeat;
  border-radius: 0;
  border: ${(p) => `1px solid ${p.theme.colorBorderChoice}`};
  display: block;
  height: 48px;
  max-width: 45rem;
  outline: none;
  padding: ${(p) => p.theme.tokens.spacing04};
`
