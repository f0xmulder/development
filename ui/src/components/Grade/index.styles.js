import styled from 'styled-components'

export const StyledGrade = styled.div`
  display: flex;
  align-items: center;
`

export const StyledLabel = styled.div`
  flex: 0 1 auto;
  color: ${(p) => p.theme.color.text.normal};
  font-size: ${(p) => p.theme.font.size.tiny};
  line-height: ${(p) => p.theme.font.lineHeight.tiny};
  font-weight: ${(p) => p.theme.font.weight.semibold};
  min-width: 68px;

  &:before {
    content: 'Score';
    text-transform: uppercase;
    color: ${(p) => p.theme.color.text.light};
    padding-right: 6px;
    font-weight: ${(p) => p.theme.font.weight.normal};
  }
`

export const gradeToColor = (grade) =>
  grade >= 8 ? '#63D19E' : grade >= 5 ? '#FEBF24' : '#F94747'

export const StyledBar = styled.div`
  background-color: #F0F2F7;
  border-radius: 10px;
  height: 4px;
  flex: 1;
  position: relative;

  &:after {
    content: '';
    background-color: ${(p) => gradeToColor(p.grade)}
    width: ${(p) => p.grade * 10}%;
    position: absolute;
    top: 0;
    height: 4px;
    border-radius: 10px;
  }
`
