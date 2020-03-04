import React from 'react'
import { string, bool, object } from 'prop-types'

import {
  Label,
  Field,
  RadioOptionGroup,
  RadioOptionWrapper,
} from '../Form/Form'
import {
  StyledFormGroup,
  HelperMessage,
  ErrorMessage,
} from '../SubmitAPIForm/SubmitAPIForm.styles'
import {
  StyledEnvironmentFormInputs,
  StyledEnvironmentHeading,
} from './EnvironmentFormInputs.styles'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const showEnvironment = (environment, values, optional) => {
  return (
    !optional || values[`has${capitalize(environment)}Environment`] === 'true'
  )
}

const EnvironmentFormInputs = ({
  title,
  environment,
  optional,
  values,
  touched,
  errors,
}) => (
  <StyledEnvironmentFormInputs>
    <StyledEnvironmentHeading>{title}</StyledEnvironmentHeading>
    {optional && (
      <StyledFormGroup>
        <Label>Heb je een {title.toLowerCase()}-omgeving?</Label>
        <RadioOptionGroup>
          <RadioOptionWrapper>
            <Field
              id={`has${capitalize(environment)}Environment`}
              name={`has${capitalize(environment)}Environment`}
              type="radio"
              value="true"
            />
            <Label htmlFor={`has${capitalize(environment)}Environment`}>
              Ja
            </Label>
          </RadioOptionWrapper>

          <RadioOptionWrapper>
            <Field
              id={`hasNo${capitalize(environment)}Environment`}
              name={`has${capitalize(environment)}Environment`}
              type="radio"
              value="false"
            />
            <Label htmlFor={`hasNo${capitalize(environment)}Environment`}>
              Nee
            </Label>
          </RadioOptionWrapper>
        </RadioOptionGroup>
      </StyledFormGroup>
    )}
    {showEnvironment(environment, values, optional) && (
      <>
        <StyledFormGroup>
          <Label htmlFor={`${environment}ApiUrl`}>API URL</Label>
          <Field
            component="input"
            type="text"
            id={`${environment}ApiUrl`}
            name={`${environment}ApiUrl`}
            maxWidth="large"
          />
          {errors[`${environment}ApiUrl`] &&
            touched[`${environment}ApiUrl`] && (
              <ErrorMessage>{errors[`${environment}ApiUrl`]}</ErrorMessage>
            )}
        </StyledFormGroup>
        <StyledFormGroup>
          <Label htmlFor={`${environment}SpecificationUrl`}>
            Specificatie URL (optioneel)
          </Label>
          <HelperMessage>
            Link naar een machine leesbare documentatie.
          </HelperMessage>
          <Field
            component="input"
            type="text"
            id={`${environment}SpecificationUrl`}
            name={`${environment}SpecificationUrl`}
            maxWidth="large"
          />
          {errors[`${environment}SpecificationUrl`] &&
            touched[`${environment}SpecificationUrl`] && (
              <ErrorMessage>
                {errors[`${environment}SpecificationUrl`]}
              </ErrorMessage>
            )}
        </StyledFormGroup>

        <StyledFormGroup>
          <Label htmlFor={`${environment}DocumentationUrl`}>
            Documentatie URL (optioneel)
          </Label>
          <HelperMessage>
            Link naar een menselijk leesbare documentatie.
          </HelperMessage>
          <Field
            component="input"
            type="text"
            id={`${environment}DocumentationUrl`}
            name={`${environment}DocumentationUrl`}
            maxWidth="large"
          />
          {errors[`${environment}DocumentationUrl`] &&
            touched[`${environment}DocumentationUrl`] && (
              <ErrorMessage>
                {errors[`${environment}DocumentationUrl`]}
              </ErrorMessage>
            )}
        </StyledFormGroup>
      </>
    )}
  </StyledEnvironmentFormInputs>
)

EnvironmentFormInputs.propTypes = {
  title: string.isRequired,
  environment: string.isRequired,
  optional: bool,
  values: object.isRequired,
  touched: object.isRequired,
  errors: object.isRequired,
}

export default EnvironmentFormInputs
