import styled from 'styled-components'

export const Container = styled.div`
    max-width: 630px;
    padding: 60px 40px 0;
    margin: 0 auto;
`

export const PageTitle = styled.h1`
  color: ${p => p.theme.color.primary.main};
  font-size: 28px;
  line-height: 36px;
  font-weight: 800;
  margin: 0 0 8px;
  text-align: center;
`

export const SubTitle = styled.h2`
  color: ${p => p.theme.color.text.light};
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  margin: 0 0 40px;
  text-align: center;
`

export const SearchBox = styled.div`
  max-width: 380px;
    margin: 0 auto 40px;
`

