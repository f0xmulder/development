import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    background-color: ${(p) => p.theme.colorBackgroundSite};
    word-wrap: break-word;
    word-break: break-word;
  }
`
