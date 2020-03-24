import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Search from '../../components/design-system-candidates/Search'

import mq from '../../theme/mediaQueries'

import APIFilters from '../../components/APIFilters/APIFilters'
import addIcon from '../../components/Icons/add_icon.svg'

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
  margin-bottom: ${(p) => p.theme.tokens.spacing07};
`

export const StyledIconButton = styled(Link)`
  height: 40px;
  margin-left: ${(p) => p.theme.tokens.spacing03};
  margin-top: ${(p) => p.theme.tokens.spacing05};
  padding: 0 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  border: none;
  border-radius: 4px;
  color: ${(p) => p.theme.colorText};
  font-size: ${(p) => p.theme.tokens.fontSizeMedium};
  font-weight: ${(p) => p.theme.tokens.fontWeightSemiBold};
  text-decoration: none;
  background-color: ${(p) => p.theme.colorBackgroundButtonSecondary};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.32);

  ${mq.smDown`
    display: none;
  `}

  &:hover {
    filter: brightness(90%);
  }

  &:before {
    height: 16px;
    margin-right: ${(p) => p.theme.tokens.spacing04};
    content: url(${addIcon});
  }
`

export const StyledAPIListContainer = styled.div`
  display: flex;
  width: 100%;

  ${mq.smDown`
    flex-direction: column;
  `}
`

export const StyledAPIFilters = styled(APIFilters)`
  flex: 0 0 250px;
  margin-top: ${(p) => p.theme.tokens.spacing08};
`

export const StyledResultsContainer = styled.div`
  flex: 1;
  margin-left: ${(p) => p.theme.tokens.spacing10};
  margin-bottom: ${(p) => p.theme.tokens.spacing12};

  ${mq.smDown`
    margin-left: 0;
  `}
`
