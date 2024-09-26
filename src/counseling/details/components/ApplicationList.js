'use client';
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import styled from 'styled-components';
import counselingTypes from '../../constants/counselingType';
import personalCategory from '../../constants/personalCategory';
import statuses from '../../constants/status';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import Modal from '@/commons/components/Modal';
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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

const FormBox = styled.form``;

const ApplicationList = ({ items, className, onSubmit, onChangeStatus }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onRecord = useCallback((record) => {
    setRecord(record);
    setVisible(true);
  }, []);

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
              <StyledTh>상담일지</StyledTh>
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
                ) => (
                  <tr key={`item_${rno}`}>
                    <StyledTd>{rno}</StyledTd>
                    <StyledTd>{format(rDateTime, 'yyyy.MM.dd')}</StyledTd>
                    <StyledTd>{format(rDateTime, 'HH:mm')}~</StyledTd>
                    <StyledTd>{userName}</StyledTd>
                    <StyledTd>
                      {counselingType
                        ? counselingTypes[counselingType]
                        : t('개인상담')}
                    </StyledTd>
                    <StyledTd>
                      {category && personalCategory[category]}
                    </StyledTd>
                    <StyledTd>{counselingName}</StyledTd>
                    <StyledTd>
                      {counselorName}({counselorEmail})
                    </StyledTd>
                    <StyledTd>
                      <select
                        value={status}
                        onChange={(e) => onChangeStatus(e, rno)}
                      >
                        {Object.keys(statuses).map((s) => (
                          <option key={`status_${i}_${s}`} value={s}>
                            {statuses[s]}
                          </option>
                        ))}
                      </select>
                    </StyledTd>
                    <StyledTd>
                      {record && (
                        <button type="button" className="record" onClick={() => onRecord(record)}>
                          {t('조회')}
                        </button>
                      )}
                    </StyledTd>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <StyledTd colSpan="10">항목이 없습니다.</StyledTd>
              </tr>
            )}
          </tbody>
        </StyledTable>
        <StyledButton type="submit" variant="primary">
          {t('변경하기')}
        </StyledButton>
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
