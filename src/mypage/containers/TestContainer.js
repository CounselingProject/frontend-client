'use client';
import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import PsychologicalTest from '../components/PsychologicalTest';
import { getAnswers } from '@/psychologicalTest/apis/apiAnswer';
import Pagination from '@/commons/components/Pagination';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { useTranslation } from 'next-i18next';

const TestContainer = () => {
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const { t } = useTranslation(); // 다국어 지원을 위한 useTranslation hook 사용

  const { setMainTitle } = getCommonActions();
  useLayoutEffect(() => {
    setMainTitle(t('온라인심리검사'));
  }, [setMainTitle, t]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAnswers(page);
        setItems(data.items);
        setPagination(data.pagination);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page]);

  const onPageClick = useCallback((page) => {
    setPage(page);
  }, []);

  if (!items || items.length === 0) {
    return <h1>로딩....</h1>;
  }

  return (
    <>
      <PsychologicalTest items={items} />
      <Pagination pagination={pagination} onClick={onPageClick} />
    </>
  );
};

export default React.memo(TestContainer);
