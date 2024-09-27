'use client';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import { applyProgram } from '../apis/apiApply';
import { useRouter } from 'next/navigation';

const FormBox = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
  }

  dl {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    dt {
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 1rem;
      color: #555;
    }

    dd {
      font-size: 1rem;
      color: #333;
      margin-left: 0;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
`;

const ProgramInfo = ({ item, onClose }) => {
  const { t } = useTranslation();
  const router = useRouter();

  // 집단 예약 신청하기
  const onApply = useCallback(
    (item) => {
      if (item.applicantsCount >= item.counselingLimit) {
        alert(t('신청이_마감되었습니다.'));
        return;
      }

      if (!confirm(t('정말_신청하겠습니까?'))) {
        return;
      }

      const [rdate, rtime] = item.counselingDate.split(' ');
      const form = {
        category: 'GROUP',
        rdate,
        rtime,
        cno: item?.cno,
        reason: item?.counselingName,
      };

      (async () => {
        try {
          await applyProgram(form);

          // 집단 상담 프로그램 신청 완료 후 목록 이동
          onClose();
          router.replace('/counseling/group');
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [t, router, onClose],
  );

  return (
    item && (
      <FormBox autoComplete="off">
        <h2>{item.counselingName}</h2>
        <dl>
          <dt>{t('집단상담_프로그램_설명')}</dt>
          <dd dangerouslySetInnerHTML={{ __html: item.counselingDes }}></dd>
        </dl>

        <dl>
          <dt>{t('상담사_이메일')}</dt>
          <dd>{item.counselorEmail}</dd>
        </dl>

        <dl>
          <dt>{t('집단상담_프로그램_신청_시작_종료일')}</dt>
          <dd>
            {item.reservationSdate} ~ {item.reservationEdate}{' '}
          </dd>
        </dl>

        <dl>
          <dt>{t('집단상담_프로그램_교육일')}</dt>
          <dd>{item.counselingDate}</dd>
        </dl>

        <dl>
          <dt>{t('인원')}</dt>
          <dd>{item.counselingLimit}명</dd>
        </dl>
        <ButtonContainer>
          {item.applicantsCount < item.counselingLimit && (
            <StyledButton type="button" onClick={() => onApply(item)}>
              {t('신청하기')}
            </StyledButton>
          )}
          <StyledButton type="button" onClick={onClose}>
            {t('닫기')}
          </StyledButton>
        </ButtonContainer>
      </FormBox>
    )
  );
};

export default React.memo(ProgramInfo);
