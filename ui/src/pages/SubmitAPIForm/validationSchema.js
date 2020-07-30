// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import * as Yup from 'yup'
import { convertEmptyValueTo } from '../../components/Form/yup-transforms'
import {
  array,
  boolean,
  date,
  mixed,
  number,
  object,
  string,
} from './yup-translations'

Yup.setLocale({
  mixed,
  array,
  string,
  object,
  date,
  boolean,
  number,
})

const validationSchemaConfiguration = {
  serviceName: Yup.string().required().label('API naam'),
  organizationName: Yup.string().required().label('Organisatienaam'),
  description: Yup.string().trim().required().label('API Omschrijving'),
  apiType: Yup.string().required().label('API type'),
  apiAuthentication: Yup.string().required().label('API Authenticatie'),

  productionApiUrl: Yup.string()
    .url()
    .required()
    .label('API URL voor productie'),
  productionSpecificationUrl: Yup.string()
    .url()
    .label('Specificatie URL voor productie'),
  productionDocumentationUrl: Yup.string()
    .url()
    .label('Documentatie URL voor productie'),

  hasAcceptanceEnvironment: Yup.boolean(),
  acceptanceApiUrl: Yup.string()
    .url()
    .when('hasAcceptanceEnvironment', {
      is: true,
      then: Yup.string().url().required(),
      otherwise: Yup.string().url(),
    })
    .label('URL'),
  acceptanceSpecificationUrl: Yup.string().url(),
  acceptanceDocumentationUrl: Yup.string().url(),

  hasDemoEnvironment: Yup.boolean(),
  demoApiUrl: Yup.string()
    .url()
    .when('hasDemoEnvironment', {
      is: true,
      then: Yup.string().url().required(),
      otherwise: Yup.string().url(),
    })
    .label('URL'),
  demoSpecificationUrl: Yup.string().url(),
  demoDocumentationUrl: Yup.string().url(),

  contact: Yup.object().shape({
    email: Yup.string().email(),
    phone: Yup.string(),
    url: Yup.string().url(),
  }),

  isBasedOnReferenceImplementation: Yup.boolean(),
  referenceImplementation: Yup.string(),

  termsOfUse: Yup.object().shape({
    governmentOnly: Yup.boolean(),
    payPerUse: Yup.boolean(),
    uptimeGuarantee: Yup.number().transform(convertEmptyValueTo(0)),
    supportResponseTime: Yup.string(),
  }),
}

export const schema = Yup.object().shape(validationSchemaConfiguration)
