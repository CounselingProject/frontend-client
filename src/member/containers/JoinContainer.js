'use client';
import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import JoinForm from '../components/JoinForm';
import { StyledWrapper } from '@/commons/components/layouts/StyledWrapper';
import { apiJoin } from '../apis/apiJoin';
import { getProfessors } from '../apis/apiInfo';

const initalForm = {
  userType: 'STUDENT',
  status: 'ONCLASS',
  gender: 'FEMALE',
  agree: false,
  zonecode: '',
  address: '',
};

const JoinContainer = () => {
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();
  const router = useRouter();
  const [form, setForm] = useState(initalForm);
  const [errors, setErrors] = useState({});
  const [professors, setProfessors] = useState([]);
  const [skey, setSkey] = useState('');

  useLayoutEffect(() => {
    setMainTitle(t('회원가입'));
  }, [t, setMainTitle]);

  // 다음 주소 api 연동
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const professors = await getProfessors(skey);
        setProfessors(professors);
        if (professors && professors.length > 0) {
          setForm((form) => ({ ...form, professor: professors[0].seq }));
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [skey]);

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        setForm((prevForm) => ({
          ...prevForm,
          zonecode: data.zonecode,
          address: data.address,
        }));
      },
    }).open();
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const _errors = {};
      let hasErrors = false;

      const requiredFields = {
        email: t('이메일을_입력하세요.'),
        password: t('비밀번호를_입력하세요.'),
        confirmPassword: t('비밀번호를_확인하세요.'),
        userName: t('회원명을_입력하세요.'),
        userType: t('가입유형을_선택하세요.'),
        zonecode: t('우편번호를_입력하세요.'),
        address: t('주소를_입력하세요.'),
        birth: t('생년월일을_입력하세요.'),
        gender: t('성별을_선택하세요.'),
        mobile: t('휴대전화번호를_입력하세요.'),
      };

      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field] || (typeof form[field] === 'string' && !form[field].trim())) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }

      if (!form.agree) {
        _errors.agree = [t('회원가입_약관에_동의하세요.')];
        hasErrors = true;
      }

      if (form.password !== form.confirmPassword) {
        _errors.confirmPassword = [t('비밀번호가_일치하지_않습니다.')];
        hasErrors = true;
      }

      setErrors(_errors);
      if (hasErrors) {
        return;
      }

      (async () => {
        try {
          await apiJoin(form);
          setForm(initalForm);
          router.replace('/member/login');
        } catch (err) {
          const messages = typeof err.message === 'string'
            ? { global: [err.message] }
            : err.message;

          for (const [field, _messages] of Object.entries(messages)) {
            _errors[field] = _errors[field] ?? [];
            _errors[field].push(_messages);
          }
          setErrors({ ..._errors });
        }
      })();
    },
    [form, router, t]
  );

  const onChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'skey') {
      setSkey(value);
    } else {
      setForm((form) => ({ ...form, [name]: value }));
    }
  }, []);

  const onToggle = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  return (
    <StyledWrapper>
      <JoinForm
        form={form}
        onSubmit={onSubmit}
        onChange={onChange}
        onToggle={onToggle}
        errors={errors}
        skey={skey}
        professors={professors}
        handleAddressClick={handleAddressClick}  // 주소 검색 클릭 핸들러 추가
      />
    </StyledWrapper>
  );
};

export default React.memo(JoinContainer);
