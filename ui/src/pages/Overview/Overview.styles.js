import styled from 'styled-components'
import APIFilters from '../../components/APIFilters/APIFilters'
import { Pagination } from '@commonground/design-system'

export const StyledOverviewPage = styled.div`
  display: flex;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 40px;
  flex-wrap: wrap;
`

export const StyledAPIFilters = styled(APIFilters)`
  flex: 0 0 250px;
  margin-top: 44px;
`

export const StyledResultsContainer = styled.div`
  flex: 1;
  margin-left: 40px;
`

export const StyledH1 = styled.h1`
  flex: 0 0 100%;
  font-size: ${(p) => p.theme.font.size.title.large};
  line-height: ${(p) => p.theme.font.lineHeight.title.large};
  font-weight: ${(p) => p.theme.font.weight.bold};
  margin-bottom: 32px;
  text-align: center;
`

export const StyledPagination = styled(Pagination)`
  justify-content: center;
  margin: 24px 0 80px 0;
`