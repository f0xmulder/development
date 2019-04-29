import React from 'react'
import {arrayOf, shape, string} from 'prop-types'
import {Table} from '@commonground/design-system'
import {StyledTable, StyledLinkToAPI} from './index.styles'

const APIList = ({ apis }) =>
  <StyledTable>
    <Table.Head>
      <Table.Row>
        <Table.HeadCell colspan="2">
          { apis.length } API's  
        </Table.HeadCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
    {
      apis.map((api, i) => 
        <Table.Row key={i}>
          <Table.BodyCell>
            <StyledLinkToAPI {...api} /> 
          </Table.BodyCell>
          <Table.BodyCell>
            Score x
          </Table.BodyCell>
        </Table.Row>
      )
    }
    </Table.Body>
  </StyledTable>

APIList.propTypes = {
    apis: arrayOf(shape({
        id: string.isRequired,
        service_name: string.isRequired,
        organization_name: string.isRequired
    }))
}

export default APIList
