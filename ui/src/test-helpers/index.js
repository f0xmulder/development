// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
export const flushPromises = () =>
  new Promise((resolve) => setImmediate(resolve))
