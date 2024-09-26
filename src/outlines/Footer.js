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
        <h3>COPYRIGHT 2020 BY EWHA WOMANS UNIVERSITY. ALL RIGHTS RESERVED.</h3>
        <FooterLinks>
          <a href="/#">소개</a>
          <a href="/#">서비스</a>
          <a href="/#">연락처</a>
          <a href="/#">개인정보처리방침</a>
        </FooterLinks>
        <FooterInfo>
        03760 서울특별시 서대문구 이화여대길 52 이화여자대학교   T. 02-3277-2114
        </FooterInfo>
      </FooterContainer>
    )
  );
};

export default React.memo(Footer);