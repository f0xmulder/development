import styled from 'styled-components'

import mq from '../../../../theme/mediaQueries'

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

export const Key = styled.div`
  width: 50%;
  margin-bottom: 4px;
  color: ${(p) => p.theme.colorTextLight};
  font-size: ${(p) => p.theme.tokens.fontSizeSmall};

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
