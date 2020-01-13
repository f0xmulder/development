import { useEffect } from 'react'
import { useFormikContext } from 'formik'

/**
 * Use this as a global Formik onChange function
 * Use the values READ ONLY -Don't create an infinite loop by SETTING any Formik values
 */
const OnFormikValueChange = ({ handle }) => {
  const { values } = useFormikContext()

  useEffect(() => {
    handle(values)
  }, [values, handle])

  return null
}

export default OnFormikValueChange
