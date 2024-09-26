import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  ${({ variant, theme, size, width, height }) => {
    const border =
      variant === 'transparent' ? `1px solid ${theme.colors.black}` : 'none';
    width = width ?? '100%';
    height = height ?? '38px';
    return css`
      color: #fff;
      background-color: ${theme.colors.green};
      border: ${border};
      font-size: ${theme.fontSizes[size] || '14px'};
      width: ${width};
      height: ${height};
    `;
  }}
  
  letter-spacing: 0;
  cursor: pointer;
  &:focus {
    opacity: 0.8;
  }

  // 호버 시 배경 색상 변경
  &:hover {
      background-color: #005d4f; /* 원하는 색상으로 변경 */
      opacity: 0.9; /* 살짝 투명하게 효과 추가 가능 */
  }
`;


export const MypageStyledButton = styled.button`
    ${({ variant, theme, size, width, height }) => {
        const border =
                variant === 'transparent' ? `1px solid ${theme.colors.black}` : 'none';
        width = width ?? '98%';
        height = height ?? '38px';
        return css`
      color: #fff;
      background-color: ${theme.colors.green};
      border: ${border};
      font-size: ${theme.fontSizes[size] || '14px'};
      width: ${width};
      height: ${height};
    `;
    }}
    letter-spacing: 0;
    cursor: pointer;

    // 포커스 시 스타일
    &:focus {
        opacity: 0.8;
    }

    // 호버 시 배경 색상 변경
    &:hover {
        background-color: #005d4f; /* 원하는 색상으로 변경 */
        opacity: 0.9; /* 살짝 투명하게 효과 추가 가능 */
    }
`;
