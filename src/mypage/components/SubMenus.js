'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getUserStates } from '@/commons/contexts/UserInfoContext';
import classNames from 'classnames';
import { useRouter } from 'next/router';  // 현재 경로를 가져오기 위해 사용

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
    a.on {
        background: #015252;
        color: ${({ theme }) => theme.colors.white};
    }
`;

const Submenus = () => {
  const { t } = useTranslation();
  const { isStudent } = getUserStates();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // useRouter는 클라이언트 측에서만 사용할 수 있으므로 useEffect 내부에서 호출
    const { pathname } = window.location;  // 현재 경로를 window 객체로 가져옴
    setCurrentPath(pathname);  // 경로 설정
  }, []);  // 빈 배열을 전달하여 클라이언트에서만 실행되도록 설정

  // 현재 경로를 기준으로 'on' 클래스를 추가
  const getActiveClass = (href) => classNames({ on: currentPath === href });

  return (
    <SubMenuBox>
      <a href="/mypage" className={getActiveClass('/mypage')}>
        {t('마이페이지')}
      </a>
      <a href="/mypage/info" className={getActiveClass('/mypage/info')}>
        {t('개인정보 수정')}
      </a>
      {isStudent && (
        <a href="/mypage/test" className={getActiveClass('/mypage/test')}>
          {t('온라인 심리검사')}
        </a>
      )}
      <a href="/mypage/board" className={getActiveClass('/mypage/board')}>
        {t('내가 작성한 게시글')}
      </a>
    </SubMenuBox>
  );
};

export default React.memo(Submenus);
