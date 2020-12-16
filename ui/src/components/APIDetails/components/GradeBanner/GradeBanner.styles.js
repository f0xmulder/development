// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import styled from 'styled-components'

import Grade, {
  percentageToBackgroundColor,
  percentageToTextColor,
} from '../../../Grade/Grade'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 138px;
  border-radius: 13px;
  margin: ${(p) => p.theme.tokens.spacing07} 0px;
  color: ${(p) => percentageToTextColor(p.percentage)};
  background-color: ${(p) => percentageToBackgroundColor(p.percentage)};
`

export const StyledGrade = styled(Grade)`
  margin-right: ${(p) => p.theme.tokens.spacing05};
`

export const PointsText = styled.span`
  font-size: 38px;
`

export const MaxPointsText = styled.span`
  font-size: 22px;
  padding-top: 12px;
`
