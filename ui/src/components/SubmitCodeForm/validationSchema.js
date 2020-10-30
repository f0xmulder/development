// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  url: Yup.string().url().required().label('URL naar code'),
  relatedApis: Yup.array().required().label('Gerelateerde API(s)'),
})

export default validationSchema
