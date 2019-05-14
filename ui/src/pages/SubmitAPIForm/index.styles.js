import styled from 'styled-components'
import { Field } from 'formik'

export const StyledFieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 40px 0;
`

export const StyledLegend = styled.legend`
  font-size: 20px;
  font-weight: 700;
  color: #2961ff;
  margin-bottom: 16px;
  padding: 0;
`

export const StyledLabel = styled.label`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 10px;
  color: #2d3240;
  font-weight: 600;
  display: inline-block;
`

export const StyledField = styled(Field)`
  display: block;
  width: 100%;
  height: calc(1.5rem + 2px);
  padding: 9px 16px 11px 16px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 20px;
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
  background-color: #2961ff;
  border-radius: 5px;
  color: #ffffff;
  font-weight: 700;
  text-align: center;
  padding: 9px 20px 11px 20px;
  border: 0 none;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
`

export const HelperMessage = styled.small`
  font-size: 14px;
  line-height: 22px;
  color: #6c757d;
`

export const ErrorMessage = styled.small`
  font-size: 14px;
  line-height: 22px;
  color: #dc3545;
`
