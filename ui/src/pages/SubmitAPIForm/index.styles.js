import styled from 'styled-components'
import { Field } from 'formik'

export const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 40px 0;
`

export const StyledLegend = styled.legend`
  font-size: ${(p) => p.theme.font.size.title.normal};
  line-height: ${(p) => p.theme.font.lineHeight.title.normal};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.primary.normal};
  margin-bottom: 16px;
  padding: 0;
`

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: ${(p) => p.theme.font.weight.semibold};
`

export const StyledField = styled(Field)`
  display: block;
  width: 100%;
  padding: 9px 16px 11px 16px;
  font-family: inherit;
  font-size: ${(p) => p.theme.font.size.normal};
  line-height: ${(p) => p.theme.font.lineHeight.normal};
  font-weight: ${(p) => p.theme.font.weight.normal};
  height: 40px;
  box-sizing: border-box;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e6eaf5;
  border-radius: 3px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const StyledFormGroupColumnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (min-width: 688px) {
    margin: 0 -28px;
  }
`

export const StyledFormGroupColumn = styled.div`
  padding: 0 28px;
  flex: 1 1 50%;
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

export const StyledSubmitButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: ${(p) => p.theme.color.primary.normal};
  border-radius: 5px;
  color: #ffffff;
  text-align: center;
  margin: 0 auto;
  padding: 0 20px 2px;
  border: 0 none;
  cursor: pointer;
  font-family: inherit;
  font-size: ${(p) => p.theme.font.size.normal};
  line-height: ${(p) => p.theme.font.lineHeight.normal};
  font-weight: ${(p) => p.theme.font.weight.semibold};
`

export const HelperMessage = styled.small`
  font-size: ${(p) => p.theme.font.size.small};
  line-height: ${(p) => p.theme.font.lineHeight.small};
  color: #6c757d;
`

export const ErrorMessage = styled.small`
  font-size: ${(p) => p.theme.font.size.small};
  line-height: ${(p) => p.theme.font.lineHeight.small};
  color: ${(p) => p.theme.color.warning};
`
