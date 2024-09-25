'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const PersonalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;

  .p1 {
    text-align: center;
    margin: 10px 0;
  }

  .p2 {
    margin-top: 40px;
    margin-left: 20px;
    text-align: left;
  }

  .counseling_list {
    list-style: none;
    padding: 40px 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .ps1 {
    width: 250px;
    height: 250px;
    color: white;
    padding: 10px;
    border-radius: 50%;
    margin-right: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  /* 상담 버튼 별 색상 다르게 설정 */
  .counseling_list :nth-child(1) {
    background: ${({ theme }) => theme.colors.blue}; /* 교수 상담 */
  }

  .counseling_list :nth-child(2) {
    background: ${({ theme }) => theme.colors.orange}; /* 취업 상담 */
  }

  .counseling_list :nth-child(3) {
    background: ${({ theme }) => theme.colors.green}; /* 심리 상담 */
  }
`;

const CounselingPage = () => {
  const { t } = useTranslation();

  return (
    <PersonalContainer>
      <h1 className="p1">{t('개인 상담')}</h1>
      <h3 className="p2">
        {t(
          '개인 상담은 교수 상담, 취업 상담, 심리 상담 3가지로 구분되며 신청 페이지의 달력에서 일자 및 시간을 선택하여 신청할 수 있습니다.',
        )}
      </h3>

      <ul className="counseling_list">
        <Link className="ps1" href="/counseling/personal/professor">
          {t('교수 상담')}
        </Link>

        <Link className="ps1" href="/counseling/personal/employment">
          {t('취업 상담')}
        </Link>

        <Link className="ps1" href="/counseling/personal/psychological">
          {t('심리 상담')}
        </Link>
      </ul>
    </PersonalContainer>
  );
};

export default React.memo(CounselingPage);
