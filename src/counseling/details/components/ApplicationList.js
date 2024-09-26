'use client';
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import styled from 'styled-components';
import counselingTypes from '../../constants/counselingType';
import personalCategory from '../../constants/personalCategory';
import statuses from '../../constants/status';
import Modal from '@/commons/components/Modal';
import { getUserStates } from '../../../commons/contexts/UserInfoContext';
import { useRouter } from 'next/navigation';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 30px auto;
`;

const StyledThead = styled.thead`
  background-color: ${({ theme }) => theme.colors.green};
`;

const StyledTh = styled.th`
  padding: 12px;
  color: white;
  text-align: center;
  border-right: 1px solid white;

  &:last-child {
    border-right: none;
  }
`;

const StyledTd = styled.td`
  padding: 12px;
  border-bottom: 1px solid white;
  border-right: 1px solid white;
  text-align: center;

  &:last-child {
    border-right: none;
  }

  button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      opacity: 0.8;
    }
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ApplicationList = ({ items, className, onSubmit, onChangeStatus }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);
  const { isStudent } = getUserStates();

  const router = useRouter();

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onRecord = useCallback((record) => {
    setRecord(record);
    setVisible(true);
  }, []);

  const onReview = useCallback(
    (rno) => {
      router.push(`/board/write/review?num1=${rno}`);
    },
    [router],
  );

  return (
    <>
      <FormBox onSubmit={onSubmit} autoComplete="off">
        <StyledTable className={className}>
          <StyledThead>
            <tr>
              <StyledTh>신청번호</StyledTh>
              <StyledTh>상담일</StyledTh>
              <StyledTh>상담시간</StyledTh>
              <StyledTh>신청자명</StyledTh>
              <StyledTh>상담구분</StyledTh>
              <StyledTh>상담종류</StyledTh>
              <StyledTh>상담명</StyledTh>
              <StyledTh>상담사명</StyledTh>
              <StyledTh>진행상태</StyledTh>
              <StyledTh>예약취소</StyledTh>
              <StyledTh>{isStudent ? '상담후기' : '상담일지'}</StyledTh>
            </tr>
          </StyledThead>
          <tbody>
            {items && items.length > 0 ? (
              items.map(
                (
                  {
                    rno,
                    userName,
                    counselingType,
                    category,
                    counselingName,
                    counselorName,
                    counselorEmail,
                    rDateTime,
                    status,
                    record,
                  },
                  i,
                ) => {
                  const endTime = addHours(rDateTime, 1);
                  return (
                    <tr key={`item_${rno}`}>
                      <StyledTd>{rno}</StyledTd>
                      <StyledTd>{format(rDateTime, 'yyyy.MM.dd')}</StyledTd>
                      <StyledTd>
                        {format(rDateTime, 'HH:mm')}~{format(endTime, 'HH:mm')}
                      </StyledTd>
                      <StyledTd>{userName}</StyledTd>
                      <StyledTd>
                        {counselingType
                          ? counselingTypes.GROUP
                          : counselingTypes.PERSONAL}
                      </StyledTd>
                      <StyledTd>
                        {category && personalCategory[category]}
                      </StyledTd>
                      <StyledTd>{counselingName}</StyledTd>
                      <StyledTd>
                        {counselorName}({counselorEmail})
                      </StyledTd>
                      <StyledTd>
                        {(status === 'APPLY' && statuses.APPLY) ||
                          (status === 'CANCEL' && statuses.CANCEL) ||
                          (status === 'DONE' && statuses.DONE)}
                      </StyledTd>
                      <StyledTd>
                        <button
                          type="button"
                          className="cancel"
                          onClick={() => onChangeStatus(rno)}
                        >
                          {t('예약취소')}
                        </button>
                      </StyledTd>
                      <StyledTd>
                        <button
                          type="button"
                          className="record"
                          onClick={() =>
                            isStudent ? onReview(rno) : onRecord(record)
                          }
                        >
                          {t('작성하기')}
                        </button>
                      </StyledTd>
                    </tr>
                  );
                },
              )
            ) : (
              <tr>
                <StyledTd colSpan="10">항목이 없습니다.</StyledTd>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </FormBox>
      {visible && record && (
        <Modal onClose={onClose} width={500}>
          <div
            dangerouslySetInnerHTML={{
              __html: record.replace(/\n/g, '<br />'),
            }}
          ></div>
        </Modal>
      )}
    </>
  );
};

export default React.memo(ApplicationList);
