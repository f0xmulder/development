import styled from 'styled-components'

import mq from '../../../../theme/mediaQueries'
import CodeBlock from '../../../CodeBlock/CodeBlock'
import External from '../../../Icons/External'

export const Wrapper = styled.section``

export const Environment = styled.div``

export const EnvData = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;

  ${mq.mdUp`
    justify-content: space-between;
  `}
`

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > :first-child {
    margin: ${(p) =>
      `0 ${p.theme.tokens.spacing05} ${p.theme.tokens.spacing05} 0`};
  }
`

export const EnvUri = styled(CodeBlock)`
  flex: 1 0 100%;
  margin-top: 0;
  margin-bottom: ${(p) => p.theme.tokens.spacing05};

  ${mq.mdUp`
    flex: 1 0 auto;
    margin-right: ${(p) => p.theme.tokens.spacing05};
  `}
`

export const ExternalIcon = styled(External)`
  margin-left: ${(p) => p.theme.tokens.spacing05};
`
