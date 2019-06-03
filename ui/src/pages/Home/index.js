import React from 'react'
import { Search } from '@commonground/design-system'

import { Container, PageTitle, SubTitle, SearchBox, StyledTagListContainer } from './index.styles'

const Home = () => (
  <Container className="Home">
    <PageTitle>developer.overheid.nl</PageTitle>
    <SubTitle>
      Een incompleet overzicht van alle API’s binnen de Nederlandse overheid.
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

export default Home
