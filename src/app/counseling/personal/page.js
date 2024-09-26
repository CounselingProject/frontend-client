'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';

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
    margin-top: 30px;
    margin-left: 20px;
    text-align: left;
  }

  .counseling_list {
    list-style: none;
    padding: 20px 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }

  .counseling_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    padding: 25px;
    margin: 0 20px;
    width: 400px;
    text-align: center;
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.lightDarkMint};
  }

  .CounselingImage {
    border-radius: 15px;
    margin-bottom: 15px;
  }

  .counseling_text {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.colors.green};
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
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
        <li>
          <Link
            href="/counseling/personal/professor"
            className="counseling_item"
          >
            <Image
              className="CounselingImage"
              src={`/images/personalCounseling/PROFESSOR.png`}
              alt="교수 상담"
              width={350}
              height={350}
            />
            <span className="counseling_text">{t('교수 상담 신청하기')}</span>
          </Link>
        </li>

        <li>
          <Link
            href="/counseling/personal/employment"
            className="counseling_item"
          >
            <Image
              className="CounselingImage"
              src={`/images/personalCounseling/EMPLOYMENT.png`}
              alt="취업 상담"
              width={350}
              height={350}
            />
            <span className="counseling_text">{t('취업 상담 신청하기')}</span>
          </Link>
        </li>

        <li>
          <Link
            href="/counseling/personal/psychological"
            className="counseling_item"
          >
            <Image
              className="CounselingImage"
              src={`/images/personalCounseling/PSYCHOLOGY.png`}
              alt="심리 상담"
              width={350}
              height={350}
            />
            <span className="counseling_text">{t('심리 상담 신청하기')}</span>
          </Link>
        </li>
      </ul>
    </PersonalContainer>
  );
};

export default React.memo(CounselingPage);
