// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
export const modelFromAPIResponse = (event) => ({
  id: event.id,
  title: event.title,
  startDate: new Date(event.start_date),
  location: event.location,
  registrationUrl: event.registration_url,
})
