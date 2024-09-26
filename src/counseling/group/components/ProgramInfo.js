'use client'
import React , { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import Modal from 'react-modal';


const FormBox = styled.form`
  dl {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    dt {
      width: 200px;
      font-weight: bold;
    }

    dd {
      flex-grow: 1;
      max-width: 100%;
      padding: 5px;
    }
  }
`

const ProgramInfo = ({ item, }) => {
  const { t } = useTranslation();
const [open, setOpen] = useState(false);

  if (!item) return null;

  return (
    <>

    {open && (<Modal isOpen={open}>
      <FormBox autoComplete="off">
        <h2>{item.counselingName}</h2>
        <dl>
          <dt>{t('집단상담 프로그램 설명')}</dt>
          <dd>{item.counselingDes}</dd>
        </dl>
        <dl>
        <dt>{t('상담사명')}</dt>
        <dd>{item.counselorName}</dd>
        </dl>
        <dl>
        <dt>{t('상담사_이메일')}</dt>
        <dd>{item.counselorEmail}</dd>
        </dl>

        <dl>
        <dt>{t('집단상담 프로그램 신청 시작-종료일')}</dt>
        <dd>{item.reservationSdate} ~ {item.reservationEdate}  </dd>
        </dl>

        <dl>
        <dt>{t('집단상담 프로그램 교육일')}</dt>
        <dd>{item.counselingDate}</dd>
        </dl>

        <dl>
        <dt>{t('인원')}</dt>
        <dd>{item.counselingLimit}</dd>
        </dl>

        <StyledButton variant="primary">{t('신청하기')}</StyledButton>
        
      </FormBox>
    </Modal>)}
    </>

  );
};

export default React.memo(ProgramInfo);
