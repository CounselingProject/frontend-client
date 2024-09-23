'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import PersonalCounselingForm from './PersonalCounselingForm';
import styled from 'styled-components';
import { apiApplyReservation } from '../../apis/apiCounseling';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const PersonalCounselingContainer = ({ type }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 상담 신청 날짜
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1초 후 로딩 해제

    return () => clearTimeout(timer);
  }, [type]);

  const handleCalendarClick = useCallback((date) => {
    setSelectedDate(date); // 선택한 상담 신청 날짜 설정
  }, []);

  if (isLoading) {
    return <div>{t('로딩 중...')}</div>;
  }

  // 상담 유형별 제목 설정
  const counselingTitles = {
    professor: t('교수 상담 예약'),
    employment: t('취업 상담 예약'),
    psychological: t('심리 상담 예약'),
  };

  if (!counselingTitles[type]) {
    return <div>{t('유효하지 않은 상담 유형입니다.')}</div>;
  }

  return (
    <Container>
      <Title>{counselingTitles[type]}</Title>
      <PersonalCounselingForm
        counselingType={type} // 상담 유형 구분
        startDate={dayjs().startOf('day').toDate()} // 상담 신청 가능 최초 날짜 : 오늘
        endDate={dayjs().add(30, 'day').toDate()} // 상담 신청 가능 최후 날짜 : 30일 후
        selectedDate={selectedDate} // 선택한 상담 신청 날짜
        onCalendarClick={handleCalendarClick}
        onSubmit={async (formData) => {
          try {
            await apiApplyReservation(formData);
            alert(t('상담 예약에 성공했습니다.'));
            router.push('/counseling'); // 예약 후 메인 페이지로 이동
          } catch (error) {
            console.error('예약 신청 오류:', error);
            alert(t('상담 예약에 실패했습니다.'));
            throw error;
          }
        }}
      />
    </Container>
  );
};

export default React.memo(PersonalCounselingContainer);
