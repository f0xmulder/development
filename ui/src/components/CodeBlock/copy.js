// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import showFeedback from './showFeedback'

export default (content, setFeedback) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(content).then(
      () => {
        showFeedback('Gekopieerd', setFeedback)
      },
      (error) => {
        showFeedback('Niet gelukt', setFeedback)
        console.error('Unable to copy using clipboard', error)
      },
    )
  } else {
    const textField = document.createElement('textarea')
    textField.innerText = content
    document.body.appendChild(textField)
    textField.select()
    try {
      var success = document.execCommand('copy')
      if (success) {
        showFeedback('Gekopieerd', setFeedback)
      } else {
        showFeedback('Niet gelukt', setFeedback)
      }
    } catch (error) {
      showFeedback('Niet gelukt', setFeedback)
      console.error('Unable to copy using execCommand', error)
    }
    textField.remove()
  }
}
