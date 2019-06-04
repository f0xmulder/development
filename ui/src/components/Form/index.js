import styled from 'styled-components'
import { Field as FormikField } from 'formik'

export const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 40px 0;
`

export const Legend = styled.legend`
  font-size: ${(p) => p.theme.font.size.title.normal};
  line-height: ${(p) => p.theme.font.lineHeight.title.normal};
  font-weight: ${(p) => p.theme.font.weight.bold};
  color: ${(p) => p.theme.color.primary.normal};
  margin-bottom: 16px;
  padding: 0;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: ${(p) => p.theme.font.weight.semibold};
`

export const Field = styled(FormikField)`
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

export const Button = styled.button`
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
