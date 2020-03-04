import { createGlobalStyle } from 'styled-components'
import 'typeface-source-sans-pro/index.css'

export default createGlobalStyle`
  html {
    color: ${(p) => p.theme.color.text.normal};
    font-family: 'Source Sans Pro', sans-serif;
    font-size: ${(p) => p.theme.font.size.normal};
    line-height: ${(p) => p.theme.font.lineHeight.normal};
    text-rendering: optimizeLegibility;
    touch-action: manipulation;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${(p) => p.theme.color.siteBackground};
    margin: 0;
    word-wrap: break-word;
    word-break: break-word;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  h1 {
    margin-top: 0;
    margin-bottom: ${(p) => p.theme.tokens.spacing05};
    font-weight: ${(p) => p.theme.tokens.fontWeightBold};
    line-height: ${(p) => p.theme.tokens.lineHeightHeading};
  }

  p {
    margin: 0 0 14px 0;
  }

  a {
    color: ${(p) => p.theme.tokens.colors.colorTextLink};
  }
`
