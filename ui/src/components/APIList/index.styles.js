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
  color: #2d3240;
  font-weight: 600;
`
