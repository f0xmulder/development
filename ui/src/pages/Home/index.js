import React, {Component} from 'react'
import TagListContainer from "../../components/TagListContainer";
import {Search} from '@commonground/design-system'

import './index.css'

export default () =>
  <div className="Home container">
      <div className="Home__Search">
          <h1>Een incompleet overzicht van alle API’s binnen de Nederlandse overheid</h1>

          <form method="GET" action="/overzicht">
              <div className="search-box">
                  <label htmlFor="searchInput" aria-label="Zoekterm">
                    <Search placeholder="Zoeken naar een API" inputName="q" inputId="searchInput" />
                  </label>
              </div>
          </form>
      </div>

      <div className="Home__Tags">
          <p>Categorieën</p>
          <TagListContainer />
      </div>
  </div>

