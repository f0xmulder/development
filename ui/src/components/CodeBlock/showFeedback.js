export default (feedback, setFeedback) => {
  setFeedback(feedback)
  setTimeout(() => {
    setFeedback(null)
  }, 2500)
}
