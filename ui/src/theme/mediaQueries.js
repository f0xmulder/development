// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { css } from 'styled-components'

import { breakpoints } from './index'

const keys = Object.keys(breakpoints)
const step = 5

// up(), down() and only() inspired by material-ui
// https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createBreakpoints.js

/**
 * Sizes of given key and up, eg;
 * media.mdUp = (min-width: <md pixels>)
 *
 * @param {string} key
 */
export const up = (key) => `@media (min-width: ${breakpoints[key]}px)`

/**
 * One unit less than next key
 * media.mdDown = (max-width: <lg pixels - 1>)
 *
 * @param {string} key
 */
export const down = (key) => {
  const nextKey = keys[keys.indexOf(key) + 1]

  // down('xl') equals up('xs')
  if (!nextKey) return up(keys[0])

  return `@media (max-width: ${breakpoints[nextKey] - step / 100}px)`
}

/**
 * Size range of given key until one unit less than next key
 * media.md = (min-width: <md pixels>) and (max-width: <lg pixels - 1>)
 *
 * @param {string} key
 */
export const only = (key) => {
  const nextKey = keys[keys.indexOf(key) + 1]

  // only('xl') equals up('xl')
  if (!nextKey) return up(key)

  return (
    `@media (min-width: ${breakpoints[key]}px) and ` +
    `(max-width: ${breakpoints[nextKey] - step / 100}px)`
  )
}

/**
 * Creates a styled-components `css` block for passed arguments and query
 *
 * @param {*} args actual css
 * @param {*} query generated media query by one of the above functions
 */
const queryFactory = (args, query) => css`
  ${query} {
    ${css(...args)}
  }
`

const mediaQueries = {}

for (let i = 0, l = keys.length; i < l; i++) {
  const label = keys[i]

  // Check if config is correct
  const breakpoint = breakpoints[label]
  if (typeof breakpoint !== 'number') {
    throw Error('Theme breakpoint is not a number')
  }

  // Even though xsDown and xlUp make no sense, just create them so there's no error when they're called
  // Functions above will make sure the styling goes well
  mediaQueries[`${label}Down`] = (...args) => queryFactory(args, down(label))
  mediaQueries[`${label}`] = (...args) => queryFactory(args, only(label))
  mediaQueries[`${label}Up`] = (...args) => queryFactory(args, up(label))
}

/**
 * Use like this:
 *
 * import styled from 'styled-components'
 * import { media } from 'theme/mediaQueries'
 * const MediaTest = styled.div`
 *     // default style
 *     background-color: hotpink;
 *
 *     ${media.md`
 *         background-color: lime;
 *     `}
 *
 *     ${media.lgUp`
 *         background-color: cyan;
 *     `}
 * `
 */
export default mediaQueries
