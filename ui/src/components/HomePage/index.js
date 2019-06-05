import React from 'react'
import { number } from 'prop-types'
import { Search } from '@commonground/design-system'

import {
  Container,
  PageTitle,
  SubTitle,
  SearchBox,
  StyledTagListContainer,
} from './index.styles'

const HomePage = ({ amountOfAPIs }) => (
  <Container className="Home">
    <PageTitle>developer.overheid.nl</PageTitle>
    <SubTitle>
      Een overzicht van {amountOfAPIs} API’s binnen de Nederlandse overheid.
    </SubTitle>

    <form method="GET" action="/overzicht">
      <SearchBox>
        <label htmlFor="searchInput" aria-label="Zoekterm">
          <Search
            inputProps={{
              placeholder: 'Zoek API',
              name: 'q',
              id: 'searchInput',
            }}
          />
        </label>
      </SearchBox>
    </form>

    <StyledTagListContainer />
  </Container>
)

HomePage.propTypes = {
  amountOfAPIs: number.isRequired,
}

export default HomePage
