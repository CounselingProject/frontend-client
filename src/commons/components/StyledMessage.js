import React from 'react';
import styled, { css } from 'styled-components';

const MessageBox = styled.div`
  ${({ variant, theme }) => {
    const color = theme.colors[variant];
    const size = theme.fontSizes.extraSmall;
    return css`
      //box-shadow: 2px 2px 10px ${color};
      color: ${color};
      font-size: ${size}px;
        margin-top: 2px;
    `;
  }}

  & + & {
    margin-top: 5px;
  }
`;

export default function StyledMessage({ children, variant, className }) {
  if (!children) return;

  const messages = Array.isArray(children) ? children : [children];
  return messages.map((message) => (
    <MessageBox
      key={Date.now() + '_' + message}
      variant={variant}
      className={className}
    >
      {message}
    </MessageBox>
  ));
}
