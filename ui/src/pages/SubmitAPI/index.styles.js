import styled from 'styled-components'

export const StyledSubmitAPI = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

export const StyledDescription = styled.p`
    font-size: ${p => p.theme.font.size.small};
    line-height: ${p => p.theme.font.lineHeight.small};
    color: ${p => p.theme.color.text.light};
    text-align: center;
`

export const StyledPageTitle = styled.h1`
  font-size: ${p => p.theme.font.size.title.large};
  line-height: ${p => p.theme.font.lineHeight.title.large};
  font-weight: ${p => p.theme.font.weight.bold};
  text-align: center;
`

export const StyledTabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  & > a {
    flex: 0 0 auto;
    padding: 8px 10px;
    font-size: ${p => p.theme.font.size.small};
    line-height: ${p => p.theme.font.lineHeight.small};
    color: ${p => p.theme.color.text.light};
    text-decoration: none;

    &.active {
      border-bottom: 1px solid ${p => p.theme.color.primary.normal};
      color: ${p => p.theme.color.primary.normal};
      padding-bottom: 7px;
    }
  }
`

