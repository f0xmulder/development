import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    line-height: 1.65rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  li {
    margin-right: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 24px;
  background: #f1f5ff;
  color: #2961ff;
  border-radius: 12px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  padding: 0 12px 2px;
  text-decoration: none;
`
