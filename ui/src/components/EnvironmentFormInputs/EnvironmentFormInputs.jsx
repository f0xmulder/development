import React from 'react'
import { string, bool, object } from 'prop-types'

import { Fieldset, Legend, Label, Field } from '../Form/Form'

import {
  StyledFormGroup,
  StyledFormSetting,
  HelperMessage,
  ErrorMessage,
} from '../SubmitAPIForm/SubmitAPIForm.styles'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const EnvironmentFormInputs = ({
  title,
  environment,
  optional,
  values,
  touched,
  errors,
}) => (
  <Fieldset>
    <Legend>{title}</Legend>
    {optional && (
      <StyledFormGroup>
        <StyledFormSetting>
          <Label
            fontWeightNormal
            htmlFor={`has${capitalize(environment)}Environment`}
          >
            Deze API heeft ook een {title.toLowerCase()}-omgeving
          </Label>
          <Field
            component="input"
            type="checkbox"
            id={`has${capitalize(environment)}Environment`}
            name={`has${capitalize(environment)}Environment`}
            checked={
              values[`has${capitalize(environment)}Environment`] === true
            }
          />
        </StyledFormSetting>
      </StyledFormGroup>
    )}
    {(!optional || values[`has${capitalize(environment)}Environment`]) && (
      <>
        <StyledFormGroup>
          <Label htmlFor={`${environment}ApiUrl`}>API URL*</Label>
          <Field
            component="input"
            type="text"
            id={`${environment}ApiUrl`}
            name={`${environment}ApiUrl`}
          />
          {errors[`${environment}ApiUrl`] &&
            touched[`${environment}ApiUrl`] && (
              <ErrorMessage>{errors[`${environment}ApiUrl`]}</ErrorMessage>
            )}
        </StyledFormGroup>
        <StyledFormGroup>
          <Label htmlFor={`${environment}SpecificationUrl`}>
            Specificatie URL
          </Label>
          <Field
            component="input"
            type="text"
            id={`${environment}SpecificationUrl`}
            name={`${environment}SpecificationUrl`}
          />
          {errors[`${environment}SpecificationUrl`] &&
            touched[`${environment}SpecificationUrl`] && (
              <ErrorMessage>
                {errors[`${environment}SpecificationUrl`]}
              </ErrorMessage>
            )}
          <HelperMessage>
            Link naar een machine leesbare documentatie.
          </HelperMessage>
        </StyledFormGroup>

        <StyledFormGroup>
          <Label htmlFor={`${environment}DocumentationUrl`}>
            Documentatie URL
          </Label>
          <Field
            component="input"
            type="text"
            id={`${environment}DocumentationUrl`}
            name={`${environment}DocumentationUrl`}
          />
          {errors[`${environment}DocumentationUrl`] &&
            touched[`${environment}DocumentationUrl`] && (
              <ErrorMessage>
                {errors[`${environment}DocumentationUrl`]}
              </ErrorMessage>
            )}
          <HelperMessage>
            Link naar een menselijk leesbare documentatie.
          </HelperMessage>
        </StyledFormGroup>
      </>
    )}
  </Fieldset>
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
