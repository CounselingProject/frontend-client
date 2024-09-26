'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import PersonalCounselingForm from '../components/PersonalCounselingForm';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { apiApplyReservation } from '../apis/apiCounseling';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

/* 페이지 로딩 메세지 */
const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.green};
  font-weight: bold;
`;

const PersonalCounselingContainer = ({ type }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 상담 신청 날짜
  const [form, setForm] = useState({
    name: '', // 상담 신청자명 기본값
    email: '', // 신청자 이메일 기본값
    mobile: '', // 신청자 연락처 기본값
    reason: '', // 상담 신청 사유 기본값
    catoegory: '', // 개인 상담 구분 기본값
  });
  const [selectedTime, setSelectedTime] = useState(''); // 선택한 상담 시간
  const [errors, setErrors] = useState({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const startDate = new Date(); // 시작 날짜
  const endDate = new Date(); // 종료 날짜
  endDate.setDate(startDate.getDate() + 90); // 오늘부터 3달까지 가능
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1초 후 로딩 해제

    return () => clearTimeout(timer);
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const FormErrors = {};
    let hasErrors = false;

    // 필수 항목 검증
    const requiredFields = {
      name: t('신청자명을 입력해주세요.'),
      email: t('신청자 이메일을 입력해주세요.'),
      mobile: t('신청자 연락처를 입력해주세요.'),
      reason: t('상담 신청 사유를 입력해주세요.'),
      category: t(
        '개인 상담 종류 PROFESSOR(교수 상담), EMPLOYMENT(취업 상담), PSYCHOLOGICAL (심리 상담) 중 하나를 입력하세요.',
      ),
    };

    if (!selectedDate) {
      FormErrors.date = t('상담 신청 날짜를 선택해주세요.');
      hasErrors = true;
    }
    if (!selectedTime) {
      FormErrors.time = t('상담 신청 시간을 선택해주세요.');
      hasErrors = true;
    }

    for (const [field, message] of Object.entries(requiredFields)) {
      if (!form[field] || !form[field].trim()) {
        FormErrors[field] = message;
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setErrors(FormErrors);
      return;
    }

    // 추가 데이터 설정
    const counselingData = {
      ...form,
      rDate: dayjs(selectedDate).format('YYYY-MM-DD'), // 상담 선택 날짜
      rTime: selectedTime, // 상담 선택 시간
      reason: `개인 상담 신청`, // 상담 신청 이유
      cNo: null, // 개인 상담이므로 집단 상담 번호는 null
    };

    try {
      await apiApplyReservation(counselingData); // 예약 API 호출
      setSubmissionSuccess(true);
      setForm({ name: '', email: '', mobile: '' });
      setSelectedTime('');
      setSelectedDate(null);
      setErrors({});
    } catch (error) {
      console.error('예약 신청 오류 : ', error);
      setErrors({ submit: t('상담 예약에 실패했습니다.') });
    }
  };

  const onCalendarClick = useCallback((date) => {
    setSelectedDate(date); // 선택한 상담 신청 날짜 설정
  }, []);

  if (isLoading) {
    return <LoadingMessage>{t('상담 신청 페이지 로딩 중...')}</LoadingMessage>;
  }

  return (
    <Container>
      <PersonalCounselingForm
        counselingType={type} // 상담 유형 구분 : 교수, 취업, 심리
        startDate={startDate} // 상담 신청 가능 시작 날짜
        endDate={endDate} // 상담 신청 가능 종료 날짜
        selectedDate={selectedDate} // 선택한 날짜
        onCalendarClick={onCalendarClick} // 날짜 선택
        onSubmit={handleSubmit} // 제출
        form={form} // 폼 데이터
        setForm={setForm} // 폼 데이터 업데이트
        selectedTime={selectedTime} // 선택한 시간
        setSelectedTime={setSelectedTime} // 시간 업데이트
        errors={errors} // 에러 메시지
        setErrors={setErrors} // 에러 업데이트
        submissionSuccess={submissionSuccess} // 제출 성공 여부
      />
    </Container>
  );
};

export default PersonalCounselingContainer;
