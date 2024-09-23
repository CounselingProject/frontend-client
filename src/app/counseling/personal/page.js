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
    margin-top: 10px;
    margin-left: 20px;
    text-align: left;
  }

  .counseling_list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .ps1 {
    width: 250px;
    height: 50px;
    background: #a9bcf5;
    color: black;
    padding: 10px;
    border-radius: 3px;
    margin-right: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-decoration: none; /* 기본 링크 스타일 제거 */
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      background: #8faee0;
    }
  }
`;

const CounselingPage = () => {
  const { t } = useTranslation();

  return (
    <PersonalContainer>
      <h1 className="p1">{t('개인 상담')}</h1>
      <h3 className="p2">
        {t(
          '개인 상담은 교수 상담, 취업 상담, 심리 상담으로 구분되며 달력에서 일자 및 시간을 선택하여 신청할 수 있습니다.',
        )}
      </h3>

      <ul className="counseling_list">
        <Link className="ps1" href="/counseling/professor">
          {t('교수 상담')}
        </Link>
        <Link className="ps1" href="/counseling/employment">
          {t('취업 상담')}
        </Link>
        <Link className="ps1" href="/counseling/psychological">
          {t('심리 상담')}
        </Link>
      </ul>
    </PersonalContainer>
  );
};

export default React.memo(CounselingPage);
