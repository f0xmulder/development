import styled from 'styled-components'
import { Field } from 'formik'
import checkbox from './checkbox.svg'

export const StyledCheckboxGroupField = styled.div`
    position: relative;
    display: flex;
    margin-top: .3rem;
    user-select: none;

    input {
      flex: 0 0 auto;
      margin: 3px 8px 0 0;

      &[disabled] {
          opacity: 0.5;

        + label {
          opacity: 0.5;
          text-decoration: line-through;
        }
      }

      &:not([disabled]) {
        cursor: pointer;

        + label {
          cursor: pointer;
        }
      }
    }

    label {
      flex: 1;
      font-size: ${p => p.theme.font.size.small};
      line-height: ${p => p.theme.font.lineHeight.small};
      color: ${p => p.theme.color.text.normal};
    }

    .count {
      flex: 0 1 auto;
      text-align: right;
      color: ${p => p.theme.color.text.light};
      font-size: ${p => p.theme.font.size.tiny};
      line-height: ${p => p.theme.font.lineHeight.tiny};
    }
`

export const StyledCheckboxField = styled(Field)`
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #cad0e0;
  background: #ffffff;
  border-radius: 2px;
  width: 14px;
  height: 14px;
  position: relative;

  &:checked {
    background: ${p => p.theme.color.primary.normal};
    border: 0 none;

    &:after {
      content: '';
      background: url(${checkbox}) no-repeat;
      background-position: center;
      position: absolute;
      width: 14px;
      height: 14px;
    }
  }
`
