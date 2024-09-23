import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import PersonalCounselingForm from './PersonalCounselingForm';

const PersonalCounselingContainer = () => {
  const { counselingId } = useParams();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1초 후 로딩 해제
  }, [counselingId]);

  const handleCalendarClick = useCallback((date) => {
    setSelectedDate(date); // 선택된 날짜
  }, []);

  if (isLoading) {
    return <div>{t('로딩 중...')}</div>;
  }

  return (
    <div>
      <h1>{t('개인 상담 예약')}</h1>
      <PersonalCounselingForm
        startDate={dayjs().startOf('day').toDate()} // 상담 신청 가능 최초 날짜 : 오늘
        endDate={dayjs().add(30, 'day').toDate()} // 상담 신청 가능 최후 날짜 : 30일 후
        selectedDate={selectedDate} // 선택된 날짜
        onCalendarClick={handleCalendarClick}
      />
    </div>
  );
};

export default React.memo(PersonalCounselingContainer);
