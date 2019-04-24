import React, {Component} from 'react'
import TagListContainer from "../../components/TagListContainer";
import {Search} from '@commonground/design-system'

import './index.css'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchInputValue: ''
        }

        this.onSearchInputValueChanged = this.onSearchInputValueChanged.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSearchInputValueChanged(e) {
        this.setState({ searchInputValue: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const { history } = this.props
        const urlParams = new URLSearchParams({ q: this.state.searchInputValue })
        history.push(`/overzicht?${urlParams.toString()}`)
    }

    render() {
        return (
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
        );
    }
}
