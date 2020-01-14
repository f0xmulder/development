/* eslint-disable react/prop-types */
import React from 'react'
import { array, object } from 'prop-types'

import {
  StyledFormGroupColumn,
  StyledFormGroupColumnContainer,
  StyledFormGroup,
  StyledFormSetting,
  HelperMessage,
  ErrorMessage,
} from './SubmitAPIForm.styles'

import {
  Fieldset,
  Legend,
  Label,
  Field,
  ButtonWrapper,
  Button,
} from '../Form/Form'

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
      <Legend>Organisatie</Legend>

      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <Label htmlFor="organizationName">Naam*</Label>
          <Field
            component="input"
            type="text"
            id="organizationName"
            name="organizationName"
          />
          {errors.organizationName && touched.organizationName && (
            <ErrorMessage>{errors.organizationName}</ErrorMessage>
          )}
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    <Fieldset>
      <Legend>API</Legend>

      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="serviceName">Naam*</Label>
            <Field
              component="input"
              type="text"
              id="serviceName"
              name="serviceName"
            />
            {errors.serviceName && touched.serviceName && (
              <ErrorMessage>{errors.serviceName}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="description">Omschrijving*</Label>
            <Field
              style={{ minHeight: '80px', resize: 'vertical' }}
              component="textarea"
              id="description"
              name="description"
            />
            {errors.description && touched.description && (
              <ErrorMessage>{errors.description}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="tags">Tags</Label>
            <Field component="input" type="text" id="tags" name="tags" />
            <HelperMessage>
              Door komma&#39;s gescheiden lijst van tags.
            </HelperMessage>
            {errors.tags && touched.tags && (
              <ErrorMessage>{errors.tags}</ErrorMessage>
            )}
          </StyledFormGroup>
        </StyledFormGroupColumn>

        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="apiUrl">API URL*</Label>
            <Field component="input" type="text" id="apiUrl" name="apiUrl" />
            {errors.apiUrl && touched.apiUrl && (
              <ErrorMessage>{errors.apiUrl}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="apiType">API type</Label>
            <Field component="select" id="apiType" name="apiType">
              <option value="Onbekend">Onbekend</option>
              <option value="REST/JSON">REST/JSON</option>
              <option value="REST/XML">REST/XML</option>
              <option value="SOAP/XML">SOAP/XML</option>
              <option value="gRPC">gRPC</option>
              <option value="GraphQL">GraphQL</option>
              <option value="SPARQL">SPARQL</option>
              <option value="WFS">WFS</option>
              <option value="WMS">WMS</option>
            </Field>
            {errors.apiType && touched.apiType && (
              <ErrorMessage>{errors.apiType}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="specificationUrl">Specificatie URL</Label>
            <Field
              component="input"
              type="text"
              id="specificationUrl"
              name="specificationUrl"
            />
            {errors.specificationUrl && touched.specificationUrl && (
              <ErrorMessage>{errors.specificationUrl}</ErrorMessage>
            )}
            <HelperMessage>
              Link naar een machine leesbare documentatie.
            </HelperMessage>
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="documentationUrl">Documentatie URL</Label>
            <Field
              component="input"
              type="text"
              id="documentationUrl"
              name="documentationUrl"
            />
            {errors.documentationUrl && touched.documentationUrl && (
              <ErrorMessage>{errors.documentationUrl}</ErrorMessage>
            )}
            <HelperMessage>
              Link naar een menselijk leesbare documentatie.
            </HelperMessage>
          </StyledFormGroup>
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>
    <Fieldset>
      <Legend>Contact</Legend>

      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="contact.email">E-mailadres</Label>
            <Field
              component="input"
              type="email"
              id="contact.email"
              name="contact.email"
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
            <Field
              component="input"
              type="text"
              id="contact.phone"
              name="contact.phone"
            />
            {errors.contact &&
              errors.contact.phone &&
              touched.contact &&
              touched.contact.phone && (
                <ErrorMessage>{errors.contact.phone}</ErrorMessage>
              )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="contact.fax">Fax</Label>
            <Field
              component="input"
              type="text"
              id="contact.fax"
              name="contact.fax"
            />
            {errors.contact &&
              errors.contact.fax &&
              touched.contact &&
              touched.contact.fax && (
                <ErrorMessage>{errors.contact.fax}</ErrorMessage>
              )}
          </StyledFormGroup>
        </StyledFormGroupColumn>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="contact.chat">Chat</Label>
            <Field
              component="input"
              type="text"
              id="contact.chat"
              name="contact.chat"
            />
            {errors.contact &&
              errors.contact.chat &&
              touched.contact &&
              touched.contact.chat && (
                <ErrorMessage>{errors.contact.chat}</ErrorMessage>
              )}
            <HelperMessage>Link naar een chat-platform.</HelperMessage>
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="contact.url">URL</Label>
            <Field
              component="input"
              type="text"
              id="contact.url"
              name="contact.url"
            />
            {errors.contact &&
              errors.contact.url &&
              touched.contact &&
              touched.contact.url && (
                <ErrorMessage>{errors.contact.url}</ErrorMessage>
              )}
            <HelperMessage>
              Link naar een website met contactinformatie.
            </HelperMessage>
          </StyledFormGroup>
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    <Fieldset>
      <Legend>Referentieimplementatie</Legend>

      {!values.referenceImplementation ||
      values.referenceImplementation === '' ? (
        <StyledFormGroup>
          <StyledFormSetting>
            <Label htmlFor="isReferenceImplementation">
              Deze API is een referentieimplementatie
            </Label>
            <Field
              component="input"
              type="checkbox"
              id="isReferenceImplementation"
              name="isReferenceImplementation"
              checked={values.isReferenceImplementation === true}
            />
            {errors.isReferenceImplementation &&
              touched.isReferenceImplementation && (
                <ErrorMessage>{errors.isReferenceImplementation}</ErrorMessage>
              )}
          </StyledFormSetting>
        </StyledFormGroup>
      ) : null}
      {!values.isReferenceImplementation ? (
        <StyledFormGroup>
          <Label htmlFor="referenceImplementation">
            Gebaseerd op (referentie implementatie)
          </Label>
          <Field
            component="select"
            id="referenceImplementation"
            name="referenceImplementation"
          >
            <option value="">Geen</option>
            {apis
              .filter((api) => api.isReferenceImplementation)
              .map((api) => (
                <option value={api.id} key={api.id}>
                  {api.serviceName} {api.organizationName}
                </option>
              ))}
          </Field>
          {errors.apiType && touched.apiType && (
            <ErrorMessage>{errors.apiType}</ErrorMessage>
          )}
        </StyledFormGroup>
      ) : null}
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
              <Field
                component="input"
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
              <Field
                component="input"
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
        </StyledFormGroupColumn>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="termsOfUse.uptimeGuarantee">
              Beschikbaarheidsgarantie van de API
            </Label>
            <Field
              component="input"
              type="number"
              max="100"
              min="0"
              step="0.01"
              id="termsOfUse.uptimeGuarantee"
              name="termsOfUse.uptimeGuarantee"
            />
            <HelperMessage>
              Opgegeven als een percentage, bijv. 99,5.
            </HelperMessage>
            {errors.termsOfUse &&
              errors.termsOfUse.payPerUse &&
              touched.termsOfUse &&
              touched.termsOfUse.payPerUse && (
                <ErrorMessage>{errors.termsOfUse.payPerUse}</ErrorMessage>
              )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="termsOfUse.supportResponseTime">
              Reactietijd van de helpdesk
            </Label>
            <Field
              component="input"
              type="text"
              id="termsOfUse.supportResponseTime"
              name="termsOfUse.supportResponseTime"
            />
            <HelperMessage>Bijv. 2 werkdagen</HelperMessage>
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

    <ButtonWrapper>
      <Button type="reset" variant="secondary">
        Reset
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        Verstuur
      </Button>
    </ButtonWrapper>
  </form>
)

SubmitAPIForm.propTypes = {
  apis: array.isRequired,
  errors: object,
  values: object,
}

SubmitAPIForm.defaultProps = {
  errors: {},
  values: {},
}

export default SubmitAPIForm
