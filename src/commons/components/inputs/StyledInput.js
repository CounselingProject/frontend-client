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
