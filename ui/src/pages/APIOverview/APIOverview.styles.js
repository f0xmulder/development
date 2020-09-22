// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Search from '../../components/design-system-candidates/Search'

import mq from '../../theme/mediaQueries'

import APIFilters from '../../components/APIFilters/APIFilters'
import AddIcon from '../../components/Icons/AddIcon'

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

export const StyledSearch = styled(Search)`
  max-width: 495px;
  margin-bottom: ${(p) => p.theme.tokens.spacing09};

  ${mq.smDown`
    margin-bottom: ${(p) => p.theme.tokens.spacing05};
  `}
`

export const StyledAddLinkDesktop = styled(Link)`
  align-self: flex-start;

  ${mq.smDown`
    display: none;
  `}
`

export const StyledAddIcon = styled(AddIcon)`
  height: ${(p) => p.theme.tokens.spacing05};
  margin-right: ${(p) => p.theme.tokens.spacing04};
`

export const StyledOverviewBody = styled.div`
  display: flex;
  width: 100%;

  ${mq.smDown`
    flex-direction: column;
  `}
`

export const StyledAPIFilters = styled(APIFilters)`
  flex: 0 0 250px;
  margin-top: ${(p) => p.theme.tokens.spacing08};
  margin-right: ${(p) => p.theme.tokens.spacing10};
`

export const StyledResultsContainer = styled.div`
  flex: 1;
  margin-bottom: ${(p) => p.theme.tokens.spacing12};

  ${mq.smDown`
    margin-left: 0;
  `}
`

export const StyledErrorMessage = styled.p`
  margin-top: ${(p) => p.theme.tokens.spacing05};
`
