'use client';
import React, { useState, useCallback, useEffect } from 'react';
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { getUserContext } from '@/commons/contexts/UserInfoContext';
import ProfileForm from '../components/ProfileForm';

const InfoContainer = () => {
  const { t } = useTranslation();
  const router = useRouter(); 

  // 유저 정보와 관련된 context를 불러옵니다.
  const {
    states: { userInfo },
    actions: { setUserInfo },
  } = getUserContext();

  // form 및 에러 상태 관리
  const [form, setForm] = useState(userInfo || {});
  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false); // 클라이언트 마운트 상태

  // 컴포넌트가 마운트 되었을 때 상태를 업데이트
  useEffect(() => {
    setMounted(true); // 클라이언트에서만 렌더링
  }, []);

  const apiUpdateUser = async (form) => {
    const response = await fetch('/account/update', { // API 엔드포인트를 '/api/update'로 설정
      method: 'PATCH', // PATCH 메서드 사용
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form), // form 데이터를 JSON으로 변환하여 전송
    });
  
    if (!response.ok) {
      const errorResponse = await response.json(); // 오류 응답을 JSON으로 파싱
      throw new Error(errorResponse.message || '회원 정보 수정에 실패했습니다.'); // 오류 메시지 던짐
    }
  
    return await response.json(); // 수정된 사용자 정보를 반환
  };
  
  

  // 입력값 변경 시 form 업데이트
  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  // 필수 항목 검증 함수
  const validateForm = useCallback(() => {
    const _errors = {};
    let hasErrors = false;

    const requiredFields = {
      userName: t('회원명을_입력하세요.'),
      zonecode: t('우편번호를_입력하세요.'),
      address: t('주소를_입력하세요.'),
      birth: t('생년월일을_입력하세요.'),
    };

    if (form?.userType === 'STUDENT') {
      requiredFields.stdntNo = t('학번을_입력하세요.');
      requiredFields.grade = t('학년을_입력하세요.');
    } else {
      requiredFields.empNo = t('사번을_입력하세요.');
    }

    for (const [field, message] of Object.entries(requiredFields)) {
      if (!form[field]?.trim()) {
        _errors[field] = message;
        hasErrors = true;
      }
    }

    setErrors(_errors);
    return !hasErrors;
  }, [form, t]);

  // 제출 시 검증 및 회원 정보 수정 처리
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault(); // 기본 폼 제출 방지
  
      if (!validateForm()) return; // 폼 유효성 검사
  
      const _errors = {}; // 에러 메시지를 저장할 객체
  
      (async () => {
        try {
          // 회원정보 수정 API 호출
          await apiUpdateUser(form); // form 데이터를 사용하여 사용자 정보를 업데이트
  
          // 폼 초기화
          setForm(initialForm); // 초기값으로 리셋 (initialForm은 초기 상태)
  
          // 수정 완료 후 마이페이지로 이동
          router.replace('/mypage');
        } catch (err) {
          // 검증 실패 또는 수정 실패
          const messages =
            typeof err.message === 'string'
              ? { global: [err.message] }
              : err.message;
  
          // 에러 메시지를 _errors 객체에 저장
          for (const [field, _messages] of Object.entries(messages)) {
            _errors[field] = _errors[field] ?? [];
            _errors[field].push(_messages);
          }
          setErrors({ ..._errors }); // 상태 업데이트
        }
      })();
    },
    [form, validateForm, router]
  );  

  // 서버에서 렌더링 방지
  if (!mounted) return null;

  return (
    <ProfileForm 
      form={form}
      errors={errors}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(InfoContainer);
