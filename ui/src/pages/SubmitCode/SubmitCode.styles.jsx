// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'
import PageContentCard from '../../components/PageContentCard/PageContentCard'

export const StyledSubmitCode = styled.div`
  max-width: ${(p) => p.theme.containerWidth};
  margin: 0 auto 100px;
  padding: 0 ${(p) => p.theme.containerPadding};
`

export const StyledPageContentCard = styled(PageContentCard)`
  padding: 0 !important;
  margin-top: 40px;
`
