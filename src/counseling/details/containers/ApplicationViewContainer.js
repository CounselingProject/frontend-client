'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { apiGet } from '../apis/apiInfo';
import apiStatus from '../apis/apiStatus';
import ApplicationItem from '../components/ApplicationItem';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ViewWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 80px;
`;

const ApplicationViewContainer = ({ params, setPageTitle }) => {
  const [item, setItem] = useState(null);
  const { rno } = params;

  const { t } = useTranslation();

  useEffect(() => {
    apiGet(rno).then((item) => {
      setPageTitle(`${t('상담신청_정보')}`);
      setItem(item);
    });
  }, [rno, setPageTitle, t]);

  /* 예약취소 함수*/
  const onCancel = useCallback(
    (rno) => {
      if (!window.confirm(t('정말_취소하겠습니까'))) {
        return;
      }

      (async () => {
        try {
          const res = await apiStatus(rno);
          setItem(res);
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [t],
  );

  return (
    <ViewWrapper>
      <ApplicationItem item={item} onCancel={onCancel} />
    </ViewWrapper>
  );
};
export default React.memo(ApplicationViewContainer);
