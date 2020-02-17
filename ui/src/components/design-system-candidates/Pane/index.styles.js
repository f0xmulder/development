import styled from 'styled-components/macro'
// import mediaQueries from '../../../theme/mediaQueries'

export const StyledBackground = styled.div`
  background: ${(p) => p.theme.tokens.colors.colorPaletteGray900};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0;

  transition: opacity 220ms;

  &.fade-in-enter-done {
    opacity: 0.75;
  }
`

export const StyledContainer = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  right 0;
  bottom: 0;
  left: 0;
  display: flex;
  
  .slide-in-enter-active {
    transition: transform 250ms ease-out;
    transform: translateX(0);
  }
  .slide-in-exit {
    transform: translateX(0);
  }
  .slide-in-exit-active {
    transform: translateX(552px);
    transition: transform 150ms ease-in;
  }
  
  .slide-in-enter-done {
    transform: translateX(0);
  }
`

export const StyledClickableBackground = styled.div`
  flex: 1;
  background: none;
  border: 0 none;
  cursor: pointer;
  z-index: 10;
`

export const StyledContentContainer = styled.div`
  background: #ffffff;
  transform: translateX(552px);
  overflow: auto;

  padding: ${(p) => p.theme.tokens.spacing05};
  width: 100%;

  padding: ${(p) => p.theme.tokens.spacing08};
  width: 552px;
`

export const StyledCloseButton = styled.button`
  background: none;
  border: 0 none;
  cursor: pointer;
  display: block;
  color: ${(p) => p.theme.tokens.colors.colorPaletteGray600};
  border-left: 1px dotted ${(p) => p.theme.tokens.colors.colorPaletteGray600};
  float: right;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  padding-left: ${(p) => p.theme.tokens.spacing04};
  font-size: 0.75rem;
  line-height: 1rem;
  padding-top: 5px;

  &:before {
    display: block;
    content: '✕';
    font-size: 3rem;
    margin-bottom: 0.75rem;
  }
`

// ${mediaQueries.smUp`
//   margin-top: -${(p) => p.theme.tokens.spacing02};
//   margin-right: -${(p) => p.theme.tokens.spacing02};
// `}
