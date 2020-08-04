// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label('Titel'),
  startDate: Yup.string()
    .matches(/([0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])/, {
      message:
        'Startdatum moet van het formaat jjjj-mm-dd zijn, bijv. 2020-08-15',
    })
    .required()
    .label('Startdatum'),
  startTime: Yup.string()
    .matches(/(2[0-3]|[01][0-9]):([0-5][0-9])/, {
      message: 'Starttijd moet van het formaat uu:mm zijn, bijv. 15:10',
    })
    .required()
    .label('Starttijd'),
  location: Yup.string().required().label('Locatie'),
  registrationUrl: Yup.string().url().required().label('URL naar event pagina'),
})

export default validationSchema
