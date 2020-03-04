import styled from 'styled-components'

import externalIcon from '../Icons/exclamationmark.svg'

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

export const ErrorMessage = styled.small`
  padding-left: ${(p) => p.theme.tokens.spacing06}
  font-size: ${(p) => p.theme.fontSizeSmall};
  font-weight: bold;
  color: ${(p) => p.theme.tokens.colorAlertError};
  background: url(${externalIcon}) no-repeat;
`
