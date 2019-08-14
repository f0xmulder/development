import React from 'react'
import { array, object } from 'prop-types'

import {
  StyledFormGroupColumn,
  StyledFormGroupColumnContainer,
  StyledFormGroup,
  StyledFormSetting,
  HelperMessage,
  ErrorMessage,
} from './index.styles'

import { Fieldset, Legend, Label, Field, Button } from '../Form'

const SubmitAPIForm = ({
  apis,
  values,
  errors,
  status,
  touched,
  handleBlur,
  handleChange,
  handleReset,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit} onReset={handleReset} data-test="form">
    <Fieldset>
      <Legend>Organisatie</Legend>

      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <Label htmlFor="organization_name">Naam*</Label>
          <Field
            component="input"
            type="text"
            id="organization_name"
            name="organization_name"
          />
          {errors.organization_name && touched.organization_name && (
            <ErrorMessage>{errors.organization_name}</ErrorMessage>
          )}
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    <Fieldset>
      <Legend>API</Legend>

      <StyledFormGroupColumnContainer>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="service_name">Naam*</Label>
            <Field
              component="input"
              type="text"
              id="service_name"
              name="service_name"
            />
            {errors.service_name && touched.service_name && (
              <ErrorMessage>{errors.service_name}</ErrorMessage>
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

          <StyledFormGroup>
            <Label htmlFor="badges">Badges</Label>
            <Field component="input" type="text" id="badges" name="badges" />
            <HelperMessage>
              Door komma&#39;s gescheiden lijst van tags.
            </HelperMessage>
            {errors.badges && touched.badges && (
              <ErrorMessage>{errors.badges}</ErrorMessage>
            )}
          </StyledFormGroup>
        </StyledFormGroupColumn>

        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="api_url">API URL*</Label>
            <Field component="input" type="text" id="api_url" name="api_url" />
            {errors.api_url && touched.api_url && (
              <ErrorMessage>{errors.api_url}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="api_type">API type</Label>
            <Field component="select" id="api_type" name="api_type">
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
            {errors.api_type && touched.api_type && (
              <ErrorMessage>{errors.api_type}</ErrorMessage>
            )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="specification_url">Specificatie URL</Label>
            <Field
              component="input"
              type="text"
              id="specification_url"
              name="specification_url"
            />
            {errors.specification_url && touched.specification_url && (
              <ErrorMessage>{errors.specification_url}</ErrorMessage>
            )}
            <HelperMessage>
              Link naar een machine leesbare documentatie.
            </HelperMessage>
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="documentation_url">Documentatie URL</Label>
            <Field
              component="input"
              type="text"
              id="documentation_url"
              name="documentation_url"
            />
            {errors.documentation_url && touched.documentation_url && (
              <ErrorMessage>{errors.documentation_url}</ErrorMessage>
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

      {!values.reference_implementation ||
      values.reference_implementation === '' ? (
        <StyledFormGroup>
          <StyledFormSetting>
            <Label htmlFor="is_reference_implementation">
              Deze API is een referentieimplementatie
            </Label>
            <Field
              component="input"
              type="checkbox"
              id="is_reference_implementation"
              name="is_reference_implementation"
              checked={values.is_reference_implementation === true}
            />
            {errors.is_reference_implementation &&
              touched.is_reference_implementation && (
                <ErrorMessage>
                  {errors.is_reference_implementation}
                </ErrorMessage>
              )}
          </StyledFormSetting>
        </StyledFormGroup>
      ) : null}
      {!values.is_reference_implementation ? (
        <StyledFormGroup>
          <Label htmlFor="reference_implementation">
            Gebaseerd op (referentie implementatie)
          </Label>
          <Field
            component="select"
            id="reference_implementation"
            name="reference_implementation"
          >
            <option value="">Geen</option>
            {apis
              .filter((api) => api.is_reference_implementation)
              .map((api) => (
                <option value={api.id} key={api.id}>
                  {api.service_name} {api.organization_name}
                </option>
              ))}
          </Field>
          {errors.api_type && touched.api_type && (
            <ErrorMessage>{errors.api_type}</ErrorMessage>
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
              <Label htmlFor="terms_of_use.government_only">
                Deze API is alleen beschikbaar voor overheden
              </Label>
              <Field
                component="input"
                type="checkbox"
                id="terms_of_use.government_only"
                name="terms_of_use.government_only"
                checked={
                  values.terms_of_use &&
                  values.terms_of_use.government_only === true
                }
              />
              {errors.terms_of_use &&
                errors.terms_of_use.government_only &&
                touched.terms_of_use &&
                touched.terms_of_use.government_only && (
                  <ErrorMessage>
                    {errors.terms_of_use.government_only}
                  </ErrorMessage>
                )}
            </StyledFormSetting>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledFormSetting>
              <Label htmlFor="terms_of_use.pay_per_use">
                De kosten voor het gebruik van de API worden verrekend met de
                gebruiker
              </Label>
              <Field
                component="input"
                type="checkbox"
                id="terms_of_use.pay_per_use"
                name="terms_of_use.pay_per_use"
                checked={
                  values.terms_of_use &&
                  values.terms_of_use.pay_per_use === true
                }
              />
              {errors.terms_of_use &&
                errors.terms_of_use.pay_per_use &&
                touched.terms_of_use &&
                touched.terms_of_use.pay_per_use && (
                  <ErrorMessage>{errors.terms_of_use.pay_per_use}</ErrorMessage>
                )}
            </StyledFormSetting>
          </StyledFormGroup>
        </StyledFormGroupColumn>
        <StyledFormGroupColumn>
          <StyledFormGroup>
            <Label htmlFor="terms_of_use.uptime_guarantee">
              Beschikbaarheidsgarantie van de API
            </Label>
            <Field
              component="input"
              type="number"
              max="100"
              min="0"
              step="0.01"
              id="terms_of_use.uptime_guarantee"
              name="terms_of_use.uptime_guarantee"
            />
            <HelperMessage>
              Opgegeven als een percentage, bijv. 99,5.
            </HelperMessage>
            {errors.terms_of_use &&
              errors.terms_of_use.pay_per_use &&
              touched.terms_of_use &&
              touched.terms_of_use.pay_per_use && (
                <ErrorMessage>{errors.terms_of_use.pay_per_use}</ErrorMessage>
              )}
          </StyledFormGroup>

          <StyledFormGroup>
            <Label htmlFor="terms_of_use.support_response_time">
              Reactietijd van de helpdesk
            </Label>
            <Field
              component="input"
              type="text"
              id="terms_of_use.support_response_time"
              name="terms_of_use.support_response_time"
            />
            <HelperMessage>Bijv. 2 werkdagen</HelperMessage>
            {errors.terms_of_use &&
              errors.terms_of_use.support_response_time &&
              touched.terms_of_use &&
              touched.terms_of_use.support_response_time && (
                <ErrorMessage>
                  {errors.terms_of_use.support_response_time}
                </ErrorMessage>
              )}
          </StyledFormGroup>
        </StyledFormGroupColumn>
      </StyledFormGroupColumnContainer>
    </Fieldset>

    {status && status.msg && <div data-test="status-message">{status.msg}</div>}

    <p style={{ textAlign: 'center', margin: 0 }}>
      <Button type="submit" disabled={isSubmitting} className="btn btn-primary">
        Verstuur
      </Button>
    </p>
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
