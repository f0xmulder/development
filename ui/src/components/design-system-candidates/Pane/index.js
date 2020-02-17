import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { ThemeProvider } from 'styled-components/macro'
import { CSSTransition } from 'react-transition-group'

import theme from '../../../theme'
import {
  StyledBackground,
  StyledContentContainer,
  StyledClickableBackground,
  StyledCloseButton,
  StyledContainer,
} from './index.styles'

const ESCAPE_KEY_CODE = 27
const isEscapeKey = (keyCode) => keyCode === ESCAPE_KEY_CODE

const Pane = ({ parentUrl, children }) => {
  const [inProp, setInProp] = useState(false)
  const history = useHistory()

  const close = () => {
    setInProp(false)

    setTimeout(() => {
      history.push(parentUrl)
    }, 150)
  }

  const onKeydownHandler = (event) => {
    if (isEscapeKey(event.keyCode)) {
      close()
    }
  }

  useEffect(() => {
    setInProp(true)

    document.addEventListener('keydown', onKeydownHandler, false)

    return () => {
      document.removeEventListener('keydown', onKeydownHandler, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <CSSTransition in={inProp} timeout={0} classNames="fade-in">
          <StyledBackground />
        </CSSTransition>

        <StyledClickableBackground
          onClick={() => close()}
          data-testid="background"
        />

        <CSSTransition in={inProp} timeout={250} classNames="slide-in">
          <StyledContentContainer data-testid="content">
            <StyledCloseButton
              onClick={() => close()}
              data-testid="close-button"
            >
              Sluit
            </StyledCloseButton>

            {children}
          </StyledContentContainer>
        </CSSTransition>
      </StyledContainer>
    </ThemeProvider>
  )
}

Pane.propTypes = {
  parentUrl: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Pane
