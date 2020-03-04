import styled from 'styled-components'

import mq from '../../theme/mediaQueries'

import Button from '../Button/Button'

export const StyledFilterButton = styled(Button)`
  width: 100%;
  justify-content: center;
  margin-bottom: ${(p) => (p.showFilters ? '0' : p.theme.tokens.spacing08)};

  ${mq.mdUp`
    display: none;
  `}

  & svg {
    margin-right: ${(p) => p.theme.tokens.spacing04};
  }
`

export const StyledAPIFilters = styled.div`
  display: ${(p) => (p.showFilters ? 'block' : 'none')};
  width: 215px;
  margin-bottom: ${(p) => p.theme.tokens.spacing09};
`
