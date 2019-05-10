import styled from 'styled-components'
import { Table } from '@commonground/design-system'
import LinkToAPI from '../LinkToAPI'

export const StyledTable = styled(Table)`
  width: 100%;

  tbody td {
    background-color: #ffffff;
  }
`

export const StyledLinkToAPI = styled(LinkToAPI)`
  text-decoration: none;
  color: ${p => p.theme.color.text.normal};
  font-weight: ${p => p.theme.font.weight.semibold};
`
