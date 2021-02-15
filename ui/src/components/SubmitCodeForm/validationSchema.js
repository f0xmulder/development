// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import * as Yup from 'yup'

Yup.addMethod(Yup.string, 'githubOrGitlabOnly', function (errorMessage) {
  return this.test(`test-github-gitlab`, errorMessage, function (value) {
    const { path, createError } = this

    return (
      (value && value.includes('github')) ||
      (value && value.includes('gitlab')) ||
      createError({ path, message: errorMessage })
    )
  })
})

Yup.addMethod(Yup.array, 'usedApi', function (errorMessage) {
  return this.test(`test-used-api`, errorMessage, function (value) {
    const { path, createError } = this

    return (
      (value && value.length) || createError({ path, message: errorMessage })
    )
  })
})

const validationSchema = Yup.object().shape({
  url: Yup.string()
    .url()
    .required()
    .githubOrGitlabOnly(
      'URL naar code moet een GitLab of GitHub repository zijn',
    )
    .label('URL naar code'),
  relatedApis: Yup.array()
    .required()
    .usedApi('Selecteer ten minste één gebruikte API')
    .label("Gerelateerde API('s)"),
})

export default validationSchema
