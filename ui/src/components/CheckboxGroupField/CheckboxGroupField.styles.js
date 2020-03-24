import styled from 'styled-components'

export const StyledCheckboxGroupField = styled.div`
  position: relative;
  display: flex;
  margin-top: ${(p) => p.theme.tokens.spacing04};
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
    font-size: ${(p) => p.theme.tokens.fontSizeMedium};
    line-height: ${(p) => p.theme.tokens.lineHeightText};
    color: ${(p) => p.theme.tokens.colorPaletteGray900};
  }

  .count {
    margin-left: ${(p) => p.theme.tokens.spacing03};
    color: ${(p) => p.theme.colorTextLight};
    font-size: ${(p) => p.theme.tokens.fontSizeSmall};
    line-height: ${(p) => p.theme.tokens.lineHeightText};
  }
`
