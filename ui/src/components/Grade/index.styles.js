import styled from 'styled-components'

export const StyledGrade = styled.div`
  display: flex;
  align-items: center;
`

export const StyledLabel = styled.div`
  flex: 0 1 auto;
  color: #2d3240;
  font-size: 13px;
  font-weight: 600;
  min-width: 80px;

  &:before {
    content: 'Score';
    text-transform: uppercase;
    color: #676d80;
    padding-right: 6px;
    font-weight: 400;
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
