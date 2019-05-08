import React from 'react'
import {func, bool, string} from 'prop-types'
import StyledHeader, { StyledTitle, StyledNavigation, StyledForm, StyledSearch } from './index.styles'
import {Navigation} from '@commonground/design-system'
import {NavLink} from 'react-router-dom'

const formSubmitHandler = (event, onSearchSubmitHandler) => {
  event.preventDefault()

  const input = event.target['query']
  onSearchSubmitHandler(input.value)
}

const TopBar = ({ showSearch, onSearchSubmitHandler, query }) =>
  <StyledHeader>
    <StyledTitle to="/">developer.overheid.nl</StyledTitle>

    {
      showSearch ?
        <StyledForm onSubmit={(event) => formSubmitHandler(event, onSearchSubmitHandler)}>
          <label htmlFor="topbar-search-api" aria-label="Zoekterm">
            <StyledSearch 
              inputProps={({
                placeholder: 'Zoeken naar een API',
                name: 'query',
                id: 'topbar-search-api',
                defaultValue: query
              })}
            />
        </label>
        </StyledForm>
        : null
    }

    <StyledNavigation>
      <Navigation.Item><NavLink to="/overzicht">Overzicht</NavLink></Navigation.Item> 
      <Navigation.Item><NavLink to="/api-toevoegen">API toevoegen</NavLink></Navigation.Item> 
      <Navigation.Item><NavLink to="/over">Over</NavLink></Navigation.Item> 
    </StyledNavigation>
  </StyledHeader>

  TopBar.propTypes = {
    onSearchSubmitHandler: func,
    showSearch: bool,
    query: string
  }

TopBar.defaultProps = {
  onSearchSubmitHandler: () => {},
  showSearch: true,
  query: ''
}

export default TopBar

