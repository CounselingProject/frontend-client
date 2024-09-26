'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getUserStates } from '@/commons/contexts/UserInfoContext';
const SubMenuBox = styled.aside`
  min-height: 650px;
    background: white; 
  a {
    display: block;
    background: white;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.medium}px;
    padding: 24px 10px 23px 20px;
    border-bottom: 1px solid #e3e3e3;
  }
  a:hover {
      background: #015252;
      color: ${({ theme }) => theme.colors.white};
  }
  //a + a {
  //    border-bottom: 1px solid #e3e3e3;
  //}
`;

const Submenus = () => {
  const { t } = useTranslation();
  const { isStudent, isProfessor } = getUserStates();

  return (
    <SubMenuBox>
      <a href={'/mypage'}>{t('마이페이지')}</a>
      <a href="/mypage/info">{t('개인정보 수정')}</a>
      {isStudent && <a href="/mypage/test">{t('온라인 심리검사')}</a>}
      {isProfessor && <a href="/mypage/mystudent">{t('담당 학생')}</a>}
      <a href="/mypage/board">{t('내가 작성한 게시글')}</a>
    </SubMenuBox>
  );
};

export default React.memo(Submenus);
