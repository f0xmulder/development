import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Navigation, Search } from '@commonground/design-system'

export default styled.header`
  padding: 29px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const StyledTitle = styled(Link)`
  color: ${(p) => p.theme.color.primary.normal};
  text-decoration: none;
  line-height: 42px;
  font-weight: ${(p) => p.theme.font.weight.bold};
  flex: 0 0 auto;
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
