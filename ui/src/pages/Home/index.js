import React from 'react'
import TagListContainer from "../../components/TagListContainer";
import {Search} from '@commonground/design-system'

import { Container, PageTitle, SubTitle, SearchBox } from './index.styles'

export default () =>
  <Container className="Home">
      <PageTitle>developer.overheid.nl</PageTitle>
      <SubTitle>Een incompleet overzicht van alle API’s binnen de Nederlandse overheid.</SubTitle>

      <form method="GET" action="/overzicht">
          <SearchBox>
              <label htmlFor="searchInput" aria-label="Zoekterm">
                <Search inputProps={({
                  placeholder: 'Zoek API',
                  name: 'q',
                  id: 'searchInput'
                })} />
              </label>
          </SearchBox>
      </form>

      <TagListContainer />
  </Container>

