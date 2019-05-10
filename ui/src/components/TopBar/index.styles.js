import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Navigation, Search } from '@commonground/design-system'

export default styled.header`
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StyledTitle = styled(Link)`
    color: ${p => p.theme.color.primary.main};

    text-decoration: none;
    padding: 0 12px;
    line-height: 42px;
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

`

export const StyledNavigation = styled(Navigation)`
    flex: 0 0 auto;
    
    &:last-of-type {
      margin-right: unset;
    }
`

export const StyledForm = styled.form`
  flex: 0 0 300px;
`

export const StyledSearch = styled(Search)`
  input {
    height: 41px;
  }
`
