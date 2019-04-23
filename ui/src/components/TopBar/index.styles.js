import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Navigation from '../Navigation'

export default styled.header`
    padding: 40px;
    display: flex;
    align-items: center;
`
export const StyledButton = styled(Link)`
    background: #517FFF;
    border-radius: 3px;
    color: #ffffff;
    text-decoration: none;
    padding: 0 12px;
    line-height: 32px;
    font-size: 14px;
    font-weight: 600;
`

export const StyledLink = styled.a`
  
`
export const StyledNavigation = styled(Navigation)`
    flex: 1;
    text-align: right;
`

