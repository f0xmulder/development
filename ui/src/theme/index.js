// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { defaultTheme } from '@commonground/design-system'

const widths = {
  container: 992,
  containerPadding: 16,
}

const heights = {
  header: 273,
  headerTopNavigation: 57,
  footer: 235,
  footerMobile: 290,
}

export const breakpoints = defaultTheme.breakpoints

const tokens = {
  ...defaultTheme.tokens,

  // Brand override
  colorBrand3: '#0B71A1',

  // Generics override
  colorFocus: '#0B82B5',
}

const theme = {
  ...defaultTheme,
  tokens,
}

// Generic additions
theme.containerWidth = `${widths.container + 2 * widths.containerPadding}px`
theme.containerPadding = `${widths.containerPadding}px`
theme.headerTopNavigationHeight = `${heights.headerTopNavigation}px`
theme.footerHeight = `${heights.footer}px`
theme.footerHeightMobile = `${heights.footerMobile}px`

theme.colorBackgroundTag = '#f1f5ff'
theme.colorBackgroundSite = '#F7F9FC'

// Text additions
theme.colorTextLight = '#676d80'
theme.colorTextInactive = '#a3a3a3'

// Input
theme.colorBorderInput = tokens.colorPaletteGray500

// Override default breakpoints which is an object. Reflexbox requires an array
theme.breakpoints = Object.values(breakpoints)
  .splice(1)
  .map((bp) => `${bp}px`)

export default theme
