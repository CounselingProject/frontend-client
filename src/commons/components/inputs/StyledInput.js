import React from 'react';
import styled from 'styled-components';
export const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 10px;
  width: 100%;
  border: 1px solid #d9d8d8;
  height: 40px;
  font-size: 14px;
  margin-bottom: 3px;
  background-color: #f9f9f9; /* 배경색 추가 */
  transition: border-color 0.3s ease; /* 부드러운 효과를 위한 트랜지션 추가 */

  &:focus {
      outline: none; /* 기본 포커스 아웃라인 제거 */
      border-color: ${({ theme }) => theme.colors.green}; /* 포커스 시 테두리 색 변경 */
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* 포커스 시 그림자 효과 추가 */
  }

  &::placeholder {
      color: ${({ theme }) => theme.colors.lightGray}; /* 플레이스홀더 색상 */
      opacity: 0.8; /* 플레이스홀더 투명도 */
  }
`;

export const StyledTextarea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: 10px;
  border-radius: 3px;
  width: 100%;
  min-height: 250px;
  resize: none;
`;

export const StyledSelect = styled.select``;
