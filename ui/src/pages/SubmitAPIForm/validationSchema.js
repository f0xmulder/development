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

const validationSchemaConfiguration = {}
validationSchemaConfiguration.description = Yup.string()
  .trim()
  .required()
validationSchemaConfiguration.organizationName = Yup.string().required()
validationSchemaConfiguration.serviceName = Yup.string().required()
validationSchemaConfiguration.apiURL = Yup.string()
  .url()
  .required()
validationSchemaConfiguration.apiType = Yup.string().required()
validationSchemaConfiguration.specificationURL = Yup.string().url()
validationSchemaConfiguration.documentationURL = Yup.string().url()
validationSchemaConfiguration.tags = Yup.string()
validationSchemaConfiguration.badges = Yup.string()
validationSchemaConfiguration.contact = Yup.object().shape({
  email: Yup.string().email(),
  phone: Yup.string(),
  fax: Yup.string(),
  chat: Yup.string().url(),
  url: Yup.string().url(),
})
validationSchemaConfiguration.contact = Yup.object().shape()

const termsOfUseSchemaConfiguration = {}
termsOfUseSchemaConfiguration.governmentOnly = Yup.boolean()
termsOfUseSchemaConfiguration.payPerUse = Yup.boolean()
termsOfUseSchemaConfiguration.uptimeGuarantee = Yup.number().transform(
  convertEmptyValueTo(0),
)
termsOfUseSchemaConfiguration.supportResponseTime = Yup.string()
validationSchemaConfiguration.termsOfUse = Yup.object().shape(
  termsOfUseSchemaConfiguration,
)
validationSchemaConfiguration.isReferenceImplementation = Yup.boolean()
validationSchemaConfiguration.referenceImplementation = Yup.string()

export default Yup.object().shape(validationSchemaConfiguration)
