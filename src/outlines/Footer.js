import React from 'react';
import styled from 'styled-components';
import { getCommonStates } from '../commons/contexts/CommonContext';

const FooterContainer = styled.footer`
  background-color: #222d29; /* 배경 색 */
  color: white; /* 글자 색 */
  padding: 20px 20px; /* 여백 */
  text-align: center; /* 가운데 정렬 */
`;

const FooterLinks = styled.div`
  margin: 20px 0; /* 여백 */
  
  a {
    color: white;
    margin: 0 15px; /* 링크 간 여백 */
    text-decoration: none;

    &:hover {
      text-decoration: underline; /* 호버 시 밑줄 */
    }
  }
`;

const FooterInfo = styled.div`
  margin-top: 20px;
  font-size: 0.9rem; /* 폰트 크기 */
`;

const Footer = () => {
  const { showFooter } = getCommonStates();

  return (
    showFooter && (
      <FooterContainer>
        <h2>우리 기관의 이름</h2>
        <FooterLinks>
          <a href="/#">소개</a>
          <a href="/#">서비스</a>
          <a href="/#">연락처</a>
          <a href="/#">개인정보처리방침</a>
        </FooterLinks>
        <FooterInfo>
          © 2024 우리 기관. 모든 권리 보유. | 주소: 서울특별시 어딘가 | 전화: 123-456-7890
        </FooterInfo>
      </FooterContainer>
    )
  );
};

export default React.memo(Footer);