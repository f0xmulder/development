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

  input[type='checkbox'] {
    flex: 0 0 auto;
    order: 1;
    width: auto;
    height: auto;
    margin: 3px 10px 0 0;
    cursor: pointer;
  }

  label {
    flex: 0 1 auto;
    order: 2;
    margin-bottom: 0;
    cursor: pointer;
    user-select: none;
  }
`

export const HelperMessage = styled.small`
  font-size: ${(p) => p.theme.font.size.small};
  line-height: ${(p) => p.theme.font.lineHeight.small};
  color: #6c757d;
`

export const ErrorMessage = styled.small`
  font-size: ${(p) => p.theme.font.size.small};
  line-height: ${(p) => p.theme.font.lineHeight.small};
  color: ${(p) => p.theme.color.error};
`
