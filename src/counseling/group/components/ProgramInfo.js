'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import { useRouter } from 'next/router';

const FormBox = styled.form`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }

  dl {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    dt {
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 1rem;
      color: #555;
    }

    dd {
      font-size: 1rem;
      color: #333;
      margin-left: 0;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; 
  gap: 15px; 
  margin-top: 30px;
`;


const ProgramInfo = ({ item }) => {
  const { t } = useTranslation();
  if (!item) return null;

  return (
    <>
      <FormBox autoComplete="off">
        <h2>{item.counselingName}</h2>
        <dl>
          <dt>{t('집단상담_프로그램_설명')}</dt>
          <dd dangerouslySetInnerHTML={{ __html: item.counselingDes }}></dd>
        </dl>
       
        <dl>
          <dt>{t('상담사_이메일')}</dt>
          <dd>{item.counselorEmail}</dd>
        </dl>

        <dl>
          <dt>{t('집단상담_프로그램_신청_시작_종료일')}</dt>
          <dd>
            {item.reservationSdate} ~ {item.reservationEdate}{' '}
          </dd>
        </dl>

        <dl>
          <dt>{t('집단상담_프로그램_교육일')}</dt>
          <dd>{item.counselingDate}</dd>
        </dl>

        <dl>
          <dt>{t('인원')}</dt>
          <dd>{item.counselingLimit}명</dd>
        </dl>
        <ButtonContainer>
        <StyledButton>{t('신청하기')}</StyledButton>
        <StyledButton>{t('닫기')}</StyledButton>
        </ButtonContainer>
      </FormBox>
    </>
  );
};

export default React.memo(ProgramInfo);
