import { useState } from 'react'

export default function(initialState) {
  const [state, setState] = useState(initialState)
  const toggleState = (forcedState) =>
    setState(typeof forcedState === 'boolean' ? forcedState : !state)

  return [state, toggleState]
}
