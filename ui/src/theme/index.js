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

export const breakpoints = {
  xs: 0, // mobile
  sm: 576, // mobile landscape
  md: 768, // tablets
  lg: 992, // Wide
}

const tokens = {
  baseFontSize: '16px',
  containerWidth: `${widths.container + 2 * widths.containerPadding}px`,
  containerPadding: `${widths.containerPadding}px`,
  headerHeight: `${heights.header}px`,
  headerTopNavigationHeight: `${heights.headerTopNavigation}px`,
  headerRemainingHeight: `${heights.header - heights.headerTopNavigation}px`,
  footerHeight: `${heights.footer}px`,
  footerHeightMobile: `${heights.footerMobile}px`,

  spacing01: '0.125rem',
  spacing02: '0.25rem',
  spacing03: '0.5rem',
  spacing04: '0.75rem',
  spacing05: '1rem',
  spacing06: '1.5rem',
  spacing07: '2rem',
  spacing08: '2.5rem',
  spacing09: '3rem',
  spacing10: '4rem',
  spacing11: '5rem',
  spacing12: '6rem',

  lineHeightText: '150%',
  lineHeightHeading: '125%',

  fontWeightRegular: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',

  fontSizeSmall: '0.875rem',
  fontSizeMedium: '1rem',
  fontSizeLarge: '1.125rem',
  fontSizeXLarge: '1.5rem',
  fontSizeXXLarge: '2rem',

  shadowDropDown: '0 0 0 2px hsla(0,0%,0%,0.12), 0 4px 10px hsla(0,0%,0%,0.24)',

  colors: {
    // Brand
    brandPrimary1: '#0B71A1',
    brandPrimary2: '#FFBC2C', // Primary action buttons
    brandSecondary1: '#E0E4EA',
    brandSecondary2: '#474E57',

    // Grays
    colorPaletteGray50: '#FAFAFA',
    colorPaletteGray100: '#F5F5F5',
    colorPaletteGray200: '#EEEEEE',
    colorPaletteGray300: '#E0E0E0',
    colorPaletteGray400: '#BDBDBD',
    colorPaletteGray500: '#9E9E9E',
    colorPaletteGray600: '#757575',
    colorPaletteGray700: '#616161',
    colorPaletteGray800: '#424242',
    colorPaletteGray900: '#212121',

    // Blues
    colorPaletteBlue50: '#E1F4F9',
    colorPaletteBlue100: '#B2E2F1',
    colorPaletteBlue200: '#82CFE8',
    colorPaletteBlue300: '#56BCDF',
    colorPaletteBlue400: '#38AEDA',
    colorPaletteBlue500: '#1EA1D5',
    colorPaletteBlue600: '#1694C8',
    colorPaletteBlue700: '#0B82B5',
    colorPaletteBlue800: '#0B71A1',
    colorPaletteBlue900: '#005282',

    // Alerts
    colorAlertWarningLight: '#FFF9C3',
    colorAlertError: '#F02B41',
    colorAlertErrorLight: '#FFC6CE',
    colorAlertSuccess: '#39870C',
    colorAlertSuccessLight: '#D6ECC1',

    // Backgrounds
    colorBackground: '#FFFFFF',

    // Text
    colorTextWhite: '#FFFFFF',
  },
}

// Derived colors

// Header
tokens.colors.navigationItemActive = '#4f9abd' // according to design

// Footer
tokens.colors.footerBackgroundColor = tokens.colors.colorPaletteGray800

// Text
tokens.colors.colorText = tokens.colors.colorPaletteGray900
tokens.colors.colorTextLabel = tokens.colors.colorPaletteGray600
tokens.colors.colorTextInputLabel = tokens.colors.colorPaletteGray800
tokens.colors.colorTextLink = tokens.colors.colorPaletteBlue800
tokens.colors.colorTextLinkHover = tokens.colors.colorPaletteBlue900
tokens.colors.colorTextError = tokens.colors.colorAlertError

// Notification
tokens.colors.colorNotificationInfo = tokens.colors.colorPaletteBlue800
tokens.colors.colorNotificationInfoLight = tokens.colors.colorPaletteBlue100
tokens.colors.colorNotificationWarning = tokens.colors.brandPrimary2

// Button
tokens.colors.colorButtonPrimary = tokens.colors.brandPrimary2
tokens.colors.colorButtonSecondary = tokens.colors.brandSecondary1

// Border
tokens.colors.colorBorderInput = tokens.colors.colorPaletteGray500
tokens.colors.colorBorderError = tokens.colors.colorAlertError

export default {
  color: {
    primary: {
      normal: '#2961ff',
    },
    text: {
      normal: '#2d3240',
      light: '#676d80',
      inactive: '#a3a3a3',
    },
    error: '#e02424',
    notify: '#ab6262',
    tagBackground: '#f1f5ff',
    siteBackground: '#F7F9FC',
  },
  font: {
    size: {
      tiny: '12px',
      small: '14px',
      normal: '16px',
      title: {
        normal: '20px',
        large: '28px',
      },
    },
    lineHeight: {
      tiny: '20px',
      small: '22px',
      normal: '24px',
      title: {
        normal: '28px',
        large: '36px',
      },
    },
    weight: {
      normal: '400',
      semibold: '600',
      bold: '700',
    },
  },
  tokens,
}
