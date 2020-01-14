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
  apiUrl: Yup.string()
    .url()
    .required(),
  apiType: Yup.string().required(),
  specificationUrl: Yup.string().url(),
  documentationUrl: Yup.string().url(),
  tags: Yup.string(),
  isReferenceImplementation: Yup.boolean(),
  referenceImplementation: Yup.string(),

  contact: Yup.object().shape({
    email: Yup.string().email(),
    phone: Yup.string(),
    fax: Yup.string(),
    chat: Yup.string().url(),
    url: Yup.string().url(),
  }),

  termsOfUse: Yup.object().shape({
    governmentOnly: Yup.boolean(),
    payPerUse: Yup.boolean(),
    uptimeGuarantee: Yup.number().transform(convertEmptyValueTo(0)),
    supportResponseTime: Yup.string(),
  }),
}

export const schema = Yup.object().shape(validationSchemaConfiguration)
