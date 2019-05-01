import styled from 'styled-components'
import {Field} from 'formik'
import checkbox from './checkbox.svg'

export const StyledCheckboxGroupField = styled.div`
    position: relative;
    display: flex;
    margin-top: .3rem;
    align-items: center;

    input {
      flex: 0 1 auto;
      margin-right: 8px;

      &[type="checkbox"]:disabled,
      &[type="checkbox"]:disabled + label {
        color: grey;
      }
    }

    label {
      display: inline-block;
      margin-bottom: 0;
      flex: 1;
      color: #2D3240;
      font-size: 14px;
    }

    .count {
      flex: 0 1 auto;
      text-align: right;
      color: #A3AABF;
      font-size: 12px;
    }
`

export const StyledCheckboxField = styled(Field)`
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #CAD0E0;
  background: #ffffff;
  border-radius: 2px;
  width: 14px;
  height: 14px;
  position: relative;

  &:checked {
    background: #517FFF;
    border: 0 none;
  }

  &:checked:after {
    content: '';
    background: url(${checkbox}) no-repeat;
    background-position: center;
    position: absolute;
    width: 14px;
    height: 14px;
  }
`

