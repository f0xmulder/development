import React from 'react'
import { arrayOf, shape, string, number } from 'prop-types'
import { Table } from '@commonground/design-system'
import { StyledTable, StyledLinkToAPI } from './APIList.styles'
import Grade from '../Grade/Grade'

const APIList = ({ total, apis }) => (
  <StyledTable>
    <Table.Head>
      <Table.Row>
        <Table.HeadCell colSpan={2}>
          <span data-test="total">{total}</span> API&#39;s
        </Table.HeadCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {apis.map((api, i) => (
        <Table.Row key={i}>
          <Table.BodyCell>
            <StyledLinkToAPI
              id={api.id}
              serviceName={api.serviceName}
              organizationName={api.organizationName}
            />
          </Table.BodyCell>
          <Table.BodyCell style={{ width: '180px' }}>
            <Grade scores={api.scores} />
          </Table.BodyCell>
        </Table.Row>
      ))}
    </Table.Body>
  </StyledTable>
)

APIList.propTypes = {
  apis: arrayOf(
    shape({
      id: string.isRequired,
      serviceName: string.isRequired,
      organizationName: string.isRequired,
    }),
  ),
  total: number.isRequired,
}

export default APIList
