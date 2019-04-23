import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Navigation} from '@commonground/design-system'

export default styled.header`
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const StyledTitle = styled(Link)`
    color: #517FFF;
    text-decoration: none;
    padding: 0 12px;
    line-height: 32px;
    font-size: 16px;
    font-weight: 800;
    flex: 0 0 auto;
`

export const StyledNavigation = styled(Navigation)`
    flex: 0 0 auto;
    
    &:last-of-type {
      margin-right: unset;
    }
`

