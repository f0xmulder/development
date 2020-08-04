// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import mq from '../../theme/mediaQueries'
import { ReactComponent as AddIcon } from '../../components/Icons/add_icon.svg'

export const StyledOverviewPage = styled.div`
  display: flex;
  max-width: ${(p) => p.theme.containerWidth};
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.containerPadding};
  flex-wrap: wrap;
`

export const StyledOverviewHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const StyledSubtitle = styled.p`
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  margin-bottom: ${(p) => p.theme.tokens.spacing07};
`

export const StyledAddLink = styled(Link)`
  align-self: flex-start;
`

export const StyledAddIcon = styled(AddIcon)`
  height: ${(p) => p.theme.tokens.spacing05};
  margin-right: ${(p) => p.theme.tokens.spacing04};
`

export const StyledAPIListContainer = styled.div`
  display: flex;
  width: 100%;

  ${mq.smDown`
    flex-direction: column;
  `}
`

export const StyledResultsContainer = styled.div`
  flex: 1;
  margin-bottom: ${(p) => p.theme.tokens.spacing12};

  ${mq.smDown`
    margin-left: 0;
  `}
`
