// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { array, object, func, bool, node } from 'prop-types'
import { Button } from '@commonground/design-system'

import EnvironmentFormInputs from '../EnvironmentFormInputs/EnvironmentFormInputs'
import {
  Fieldset,
  Legend,
  Label,
  Field,
  SelectField,
  CheckboxField,
  RadioOptionGroup,
  RadioOptionWrapper,
} from '../Form/Form'
import { APIType, APIAuthentication, EnvironmentType } from '../../models/enums'
import {
  StyledFormGroupColumn,
  StyledFormGroupColumnContainer,
  StyledFormGroup,
  StyledFormSetting,
  HelperMessage,
  StyledErrorMessage,
  StyledExclamationMark,
} from './SubmitAPIForm.styles'

import PercentageInput from './PercentageInput'

export const ErrorMessage = ({ children, ...props }) => (
  <StyledErrorMessage {...props}>
    <StyledExclamationMark />
    {children}
  </StyledErrorMessage>
)
ErrorMessage.propTypes = { children: node }

const SubmitAPIForm = ({
  apis,
  values,
  errors,
  status = undefined,
  touched,
  handleReset,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit} onReset={handleReset} data-test="form">
    <Fieldset>
      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="serviceName">API naam</Label>
            <Field
              type="text"
              id="serviceName"
              name="serviceName"
              maxWidth="medium"
            />
            {errors.serviceName && touched.serviceName && (
              <ErrorMessage>{errors.serviceName}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="description">API omschrijving</Label>
            <Field
              style={{ minHeight: '152px', resize: 'vertical' }}
              component="textarea"
              id="description"
              name="description"
              maxWidth="large"
            />
            {errors.description && touched.description && (
              <ErrorMessage>{errors.description}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="organizationName">Naam van organisatie</Label>
            <Field
              type="text"
              id="organizationName"
              name="organizationName"
              maxWidth="medium"
            />
            {errors.organizationName && touched.organizationName && (
              <ErrorMessage>{errors.organizationName}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="apiType">API type</Label>
            <SelectField
              component="select"
              id="apiType"
              name="apiType"
              maxWidth="small"
            >
              {APIType.entries().map((apiType) => (
                <option key={apiType.value} value={apiType.value}>
                  {apiType.label}
                </option>
              ))}
            </SelectField>
            {errors.apiType && touched.apiType && (
              <ErrorMessage>{errors.apiType}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label>API authenticatie</Label>
            <RadioOptionGroup>
              {APIAuthentication.entries().map((apiAuth) => {
                const fieldId = `apiAuthentication-${apiAuth.value}`

                return (
                  <RadioOptionWrapper key={apiAuth.value}>
                    <Field
                      id={fieldId}
                      name="apiAuthentication"
                      type="radio"
                      value={apiAuth.value}
                    />
                    <Label htmlFor={fieldId}>{apiAuth.label}</Label>
                  </RadioOptionWrapper>
                )
              })}
            </RadioOptionGroup>
            {errors.apiAuthentication && touched.apiAuthentication && (
              <ErrorMessage>{errors.apiAuthentication}</ErrorMessage>
            )}
          </StyledFormGroup>
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    <Fieldset>
      <Legend>Omgevingen</Legend>

      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          {EnvironmentType.entries().map((envType) => (
            <EnvironmentFormInputs
              key={envType.value}
              title={envType.label}
              environment={envType.value}
              optional={envType.value !== EnvironmentType.PRODUCTION.value}
              values={values}
              touched={touched}
              errors={errors}
            />
          ))}
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    <Fieldset>
      <Legend>Contact</Legend>

      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="contact.email">E-mailadres</Label>
            <HelperMessage>
              Dit wordt als contactinformatie bij de API getoond
            </HelperMessage>
            <Field
              type="email"
              id="contact.email"
              name="contact.email"
              maxWidth="large"
            />
            {errors.contact &&
              errors.contact.email &&
              touched.contact &&
              touched.contact.email && (
                <ErrorMessage>{errors.contact.email}</ErrorMessage>
              )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="contact.phone">Telefoonnummer</Label>
            <HelperMessage>
              Dit wordt als contactinformatie bij de API getoond
            </HelperMessage>
            <Field
              type="text"
              id="contact.phone"
              name="contact.phone"
              maxWidth="large"
            />
            {errors.contact &&
              errors.contact.phone &&
              touched.contact &&
              touched.contact.phone && (
                <ErrorMessage>{errors.contact.phone}</ErrorMessage>
              )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="contact.url">URL</Label>
            <HelperMessage>
              Link naar een website met contactinformatie.
            </HelperMessage>
            <Field
              type="text"
              id="contact.url"
              name="contact.url"
              maxWidth="large"
            />
            {errors.contact &&
              errors.contact.url &&
              touched.contact &&
              touched.contact.url && (
                <ErrorMessage>{errors.contact.url}</ErrorMessage>
              )}
          </StyledFormGroup>
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    <Fieldset>
      <Legend>Referentieimplementatie</Legend>
      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label>Is de API gebaseerd op een referentieimplementatie?</Label>
            <RadioOptionGroup>
              <RadioOptionWrapper>
                <Field
                  id="isBasedOnReferenceImplementation"
                  name="isBasedOnReferenceImplementation"
                  type="radio"
                  value="true"
                />
                <Label htmlFor="isBasedOnReferenceImplementation">Ja</Label>
              </RadioOptionWrapper>

              <RadioOptionWrapper>
                <Field
                  id="isNotBasedOnReferenceImplementation"
                  name="isBasedOnReferenceImplementation"
                  type="radio"
                  value="false"
                />
                <Label htmlFor="isNotBasedOnReferenceImplementation">Nee</Label>
              </RadioOptionWrapper>
            </RadioOptionGroup>
          </StyledFormGroup>
          {values.isBasedOnReferenceImplementation === 'true' ? (
            <StyledFormGroup>
              <Label htmlFor="referenceImplementation">
                Gebaseerd op (referentie implementatie)
              </Label>
              <SelectField
                component="select"
                id="referenceImplementation"
                name="referenceImplementation"
                maxWidth="large"
              >
                <option value="">Geen</option>
                {apis
                  .filter((api) => api.isReferenceImplementation)
                  .map((api) => (
                    <option value={api.id} key={api.id}>
                      {api.serviceName} {api.organizationName}
                    </option>
                  ))}
              </SelectField>
              {errors.apiType && touched.apiType && (
                <ErrorMessage>{errors.apiType}</ErrorMessage>
              )}
            </StyledFormGroup>
          ) : null}
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    <Fieldset>
      <Legend>Gebruiksvoorwaarden</Legend>

      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <StyledFormSetting>
              <Label htmlFor="termsOfUse.governmentOnly">
                Deze API is alleen beschikbaar voor overheden
              </Label>
              <CheckboxField
                type="checkbox"
                id="termsOfUse.governmentOnly"
                name="termsOfUse.governmentOnly"
                checked={
                  values.termsOfUse && values.termsOfUse.governmentOnly === true
                }
              />
              {errors.termsOfUse &&
                errors.termsOfUse.governmentOnly &&
                touched.termsOfUse &&
                touched.termsOfUse.governmentOnly && (
                  <ErrorMessage>
                    {errors.termsOfUse.governmentOnly}
                  </ErrorMessage>
                )}
            </StyledFormSetting>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledFormSetting>
              <Label htmlFor="termsOfUse.payPerUse">
                De kosten voor het gebruik van de API worden verrekend met de
                gebruiker
              </Label>
              <CheckboxField
                type="checkbox"
                id="termsOfUse.payPerUse"
                name="termsOfUse.payPerUse"
                checked={
                  values.termsOfUse && values.termsOfUse.payPerUse === true
                }
              />
              {errors.termsOfUse &&
                errors.termsOfUse.payPerUse &&
                touched.termsOfUse &&
                touched.termsOfUse.payPerUse && (
                  <ErrorMessage>{errors.termsOfUse.payPerUse}</ErrorMessage>
                )}
            </StyledFormSetting>
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="termsOfUse.uptimeGuarantee">
              Beschikbaarheidsgarantie van de API
            </Label>
            <Field
              component={PercentageInput}
              type="number"
              max="100"
              min="0"
              step="0.01"
              id="termsOfUse.uptimeGuarantee"
              name="termsOfUse.uptimeGuarantee"
              maxWidth="small"
            />
            {errors.termsOfUse &&
              errors.termsOfUse.payPerUse &&
              touched.termsOfUse &&
              touched.termsOfUse.payPerUse && (
                <ErrorMessage>{errors.termsOfUse.payPerUse}</ErrorMessage>
              )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="termsOfUse.supportResponseTime">
              Binnen hoeveel werkdagen reageert de helpdesk doorgaans?
              (optioneel)
            </Label>
            <Field
              type="number"
              min="1"
              step="1"
              id="termsOfUse.supportResponseTime"
              name="termsOfUse.supportResponseTime"
              maxWidth="extraSmall"
            />
            {errors.termsOfUse &&
              errors.termsOfUse.supportResponseTime &&
              touched.termsOfUse &&
              touched.termsOfUse.supportResponseTime && (
                <ErrorMessage>
                  {errors.termsOfUse.supportResponseTime}
                </ErrorMessage>
              )}
          </StyledFormGroup>
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    {status && status.msg && <div data-test="status-message">{status.msg}</div>}

    <Button primary type="submit" disabled={isSubmitting}>
      API toevoegen
    </Button>
  </form>
)

SubmitAPIForm.propTypes = {
  apis: array.isRequired,
  errors: object,
  values: object,

  status: object,
  touched: object,
  handleReset: func,
  handleSubmit: func,
  isSubmitting: bool,
}

SubmitAPIForm.defaultProps = {
  errors: {},
  values: {},
}

export default SubmitAPIForm
