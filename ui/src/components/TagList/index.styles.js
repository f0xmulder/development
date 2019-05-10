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
  background: #F1F5FF;
  color: ${p => p.theme.color.primary.normal};
  border-radius: 12px;
  font-size: ${p => p.theme.font.size.tiny};
  line-height: ${p => p.theme.font.lineHeight.tiny};
  font-weight: ${p => p.theme.font.weight.semibold};
  padding: 0 12px 2px;
  text-decoration: none;
`
