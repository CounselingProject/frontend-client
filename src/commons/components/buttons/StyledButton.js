import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  ${({ variant, theme, size, width, height }) => {
    const border =
      variant === 'transparent' ? `1px solid ${theme.colors.black}` : 'none';
    width = width ?? '150px'; // 기본 너비 설정
    height = height ?? '38px'; // 기본 높이 설정
    return css`
      color: #fff; // 글자 색상
      background-color: ${theme.colors[variant]}; // 배경색
      border: ${border}; // 테두리 설정
      font-size: ${theme.fontSizes[size] || '14px'}; // 글자 크기 설정
      width: ${width}; // 너비 설정
      height: ${height}; // 높이 설정
    `;
  }}

  border-radius: 0; // 네모 모양으로 만들기 위해 테두리 반경 0으로 설정
  letter-spacing: 0; // 글자 간격
  cursor: pointer; // 커서 모양 변경
  &:focus {
    opacity: 0.8; // 포커스 시 효과
  }

  // 호버 시 배경 색상 변경
  &:hover {
    background-color: #005d4f; // 호버 시 배경색
    opacity: 0.9; // 살짝 투명하게 효과 추가
  }
`;

export const MypageStyledButton = styled.button`
  ${({ variant, theme, size, width, height }) => {
    const border =
      variant === 'transparent' ? `1px solid ${theme.colors.black}` : 'none';
    height = height ?? '38px'; // 기본 높이 설정
    return css`
      margin-top: 15px; // 상단 여백
      color: #fff; // 글자 색상
      background-color: ${theme.colors.green}; // 배경색
      border: ${border}; // 테두리 설정
      font-size: ${theme.fontSizes[size] || '14px'}; // 글자 크기 설정
      max-width: 800px; // 최대 너비 설정
      min-width: 700px; // 최소 너비 설정
      height: ${height}; // 높이 설정
    `;
  }}
  
  border-radius: 0; // 네모 모양으로 만들기 위해 테두리 반경 0으로 설정
  letter-spacing: 0; // 글자 간격
  cursor: pointer; // 커서 모양 변경

  // 포커스 시 스타일
  &:focus {
    opacity: 0.8; // 포커스 시 효과
  }

  // 호버 시 배경 색상 변경
  &:hover {
    background-color: #005d4f; // 호버 시 배경색
    opacity: 0.9; // 살짝 투명하게 효과 추가
  }
`;
