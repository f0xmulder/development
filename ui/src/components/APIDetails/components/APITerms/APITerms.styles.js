// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import mq from '../../../../theme/mediaQueries'
import { DONSmall } from '../../../CustomDON'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${mq.smUp`
    display: flex;
    flex-direction: row;
  `}
`

export const Term = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;

  ${mq.smUp`
    display: flex;
    flex-direction: column;
    justify-content: start;
  `}
`

export const Key = styled(DONSmall)`
  width: 50%;
  margin-bottom: 4px;

  ${mq.smUp`
    width: 100%;
  `}
`

export const Value = styled.div`
  width: 50%;
  margin-bottom: 4px;

  ${mq.smUp`
    width: 100%;
  `}
`
