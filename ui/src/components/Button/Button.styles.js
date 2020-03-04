import styled from 'styled-components'

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  border: none;
  border-radius: 4px;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  text-decoration: none;
  color: ${(p) => p.theme.tokens.colors.colorPaletteGray900};
  background-color: ${(p) =>
    p.primary
      ? p.theme.tokens.colors.colorButtonPrimary
      : p.theme.tokens.colors.colorButtonSecondary};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.32);
  cursor: pointer;

  &:hover,
  &:focus {
    filter: brightness(90%);
  }

  &[disabled] {
    opacity: 0.4;
    filter: none;
    cursor: default;
  }
`
