import styled from 'styled-components';

// StyledDd 정의 - StyledInput의 스타일을 그대로 적용
export const StyledDd = styled.dd`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 10px;
  border-radius: 3px;
  width: 100%;
`;