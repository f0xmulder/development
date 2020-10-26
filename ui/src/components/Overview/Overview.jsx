// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import theme from '../../theme'
import {
  StyledHeader,
  TotalResults,
  StyledAddLinkMobile,
  StyledAddIcon,
} from './Overview.styles'

export const ResultsHeader = ({
  totalResults,
  objectName,
  objectNamePlural,
  addLinkTarget,
}) => (
  <StyledHeader>
    <TotalResults>
      {totalResults ? (
        <span data-test="total">
          {totalResults} {totalResults > 1 ? objectNamePlural : objectName}
        </span>
      ) : null}
    </TotalResults>
    {/* We should replace "forwardedAs" with "as" when this issue has been fixed:
        https://gitlab.com/commonground/core/design-system/-/issues/29 */}
    <StyledAddLinkMobile forwardedAs={Link} to={addLinkTarget} variant="link">
      <StyledAddIcon color={theme.colorTextLink} />
      {objectName} toevoegen
    </StyledAddLinkMobile>
  </StyledHeader>
)

ResultsHeader.propTypes = {
  totalResults: PropTypes.number,
  objectName: PropTypes.string.isRequired,
  objectNamePlural: PropTypes.string.isRequired,
  addLinkTarget: PropTypes.string.isRequired,
}
