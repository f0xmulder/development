import * as Yup from 'yup'
import {
  array,
  boolean,
  date,
  mixed,
  number,
  object,
  string,
} from './yup-translations'
import { convertEmptyValueTo } from '../../components/Form/yup-transforms'

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
  description: Yup.string()
    .trim()
    .required(),
  organizationName: Yup.string().required(),
  serviceName: Yup.string().required(),
  apiType: Yup.string().required(),
  apiAuthentication: Yup.string().required(),

  productionApiUrl: Yup.string()
    .url()
    .required(),
  productionSpecificationUrl: Yup.string().url(),
  productionDocumentationUrl: Yup.string().url(),

  hasAcceptanceEnvironment: Yup.boolean(),
  acceptanceApiUrl: Yup.string()
    .url()
    .when('hasAcceptanceEnvironment', {
      is: true,
      then: Yup.string()
        .url()
        .required(),
      otherwise: Yup.string().url(),
    }),
  acceptanceSpecificationUrl: Yup.string().url(),
  acceptanceDocumentationUrl: Yup.string().url(),

  hasDemoEnvironment: Yup.boolean(),
  demoApiUrl: Yup.string()
    .url()
    .when('hasDemoEnvironment', {
      is: true,
      then: Yup.string()
        .url()
        .required(),
      otherwise: Yup.string().url(),
    }),
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
