// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'

import SubmitCodeForm from '../../components/SubmitCodeForm/SubmitCodeForm'
import { StyledSubmitCode, StyledPageContentCard } from './SubmitCode.styles'

const SubmitCode = () => (
  <StyledSubmitCode>
    <h1>Project toevoegen</h1>
    <p>Voeg code toe door onderstaand formulier in te vullen.</p>
    <StyledPageContentCard>
      <StyledPageContentCard.Body>
        <SubmitCodeForm />
      </StyledPageContentCard.Body>
    </StyledPageContentCard>
  </StyledSubmitCode>
)

export default SubmitCode
