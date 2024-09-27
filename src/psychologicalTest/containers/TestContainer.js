'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { produce } from 'immer';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { getTest } from '../apis/apiInfo';
import answer from '../apis/apiAnswer';
import TestForm from '../components/TestForm';

const TestContainer = ({ params }) => {
  const { testType } = params;
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    testType,
    answers: {},
  });
  const [errors, setErrors] = useState({});

  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const items = await getTest(testType);
        setItems(items);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [testType]);

  const onClick = useCallback((questionId, score) => {
    setForm(
      produce((draft) => {
        draft.answers[questionId] = score;
      }),
    );
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /* 유효성 검사 */
      let hasErrors = false;
      setErrors({});
      const { answers } = form;
      const answered = Object.values(answers).length;
      if (answered < items.length) {
        setErrors({ global: t('모든_문항에_답변하세요') });
        hasErrors = true;
      }

      if (hasErrors) {
        // 검증 실패시 처리 X
        return;
      }

      // 설문지 저장 처리
      (async () => {
        try {
          const res = await answer(form);
          router.replace(`/psychologicalTest/answer/${res.resultId}`);
        } catch (err) {
          console.error(err);
          const message = err.message;
          setErrors(
            typeof message === 'string' ? { global: message } : message,
          );
        }
      })();
    },
    [form, items, t, router],
  );

  // 검사 타입에 따른 제목과 설명 정의
  const testDetails = {
    COMPULSION: {
      title: '강박증 자가진단',
      description: '각 문항을 읽고, 자신의 경험과 일치하거나 자신을 잘 나타내면 "그렇다"에, 그렇지 않으면 “아니다”에 체크해 주십시오.',
    },
    EVASION: {
      title: '사회 공포/회피 자가진단',
      description: '각 문항을 읽고, 오늘을 포함하여 지난 한 달간의 자신을 가장 잘 나타내는 곳에 체크해 주십시오.',
    },
    STRESS: {
      title: '스트레스 자가진단',
      description: '각 문항을 읽고, 오늘을 포함하여 지난 한 달간의 자신을 가장 잘 나타내는 곳에 체크해 주십시오.',
    },
    INTERNET_ADDICTION: {
      title: '인터넷 중독 자가진단',
      description: '다음 문항에서 인터넷이란 컴퓨터, 스마트폰을 이용한 모든 활동을 뜻합니다. 당신의 행동을 나타내는 곳에 체크해 주십시오. ',
    },
    EATING_DISORDER: {
      title: '섭식장애 자가진단',
      description: '각 문항을 읽고, 자신의 상태를 가장 잘 나타낸다고 생각되는 곳에 체크해 주십시오.',
    },
  };

  const { title, description } = testDetails[testType] || { title: '', description: '' };

  return (
    <TestForm
      items={items}
      form={form}
      errors={errors}
      onClick={onClick}
      onSubmit={onSubmit}
      title={title}
      description={description}
    />
  );
};

export default React.memo(TestContainer);
