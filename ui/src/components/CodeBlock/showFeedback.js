// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
export default (feedback, setFeedback) => {
  setFeedback(feedback)
  setTimeout(() => {
    setFeedback(null)
  }, 2500)
}
