'use client';
import React from 'react';
import styled from 'styled-components';
import PersonalCounselingCalendarForm from './PersonalCounselingCalendarForm';
import InfoBox from './InfoBox';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import MessageBox from '@/commons/components/MessageBox';
import { useTranslation } from 'react-i18next';

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
`;

const TimeTable = styled.div`
  margin-left: 20px;
  flex-grow: 1;
`;

const TimeButton = styled.button`
  background: ${({ isSelected }) => (isSelected ? '#0069b4' : '#ffffff')};
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#0069b4')};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 5px;
  width: 130px;
  padding: 10px 35px;
  margin: 5px 5px 20px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    color: #ffffff;
  }
`;

const ReservationInfoBox = styled.dl`
  font-size: 1.2rem;
`;

const PersonalCounselingForm = ({
  counselingType,
  startDate,
  endDate,
  selectedDate,
  onCalendarClick,
  onSubmit,
  form,
  setForm,
  selectedTime,
  setSelectedTime,
  errors,
  setErrors,
  submissionSuccess,
}) => {
  const { t } = useTranslation();

  const times = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  return (
    <FormBox autoComplete="off">
      <PersonalCounselingCalendarForm
        startDate={startDate}
        endDate={endDate}
        selectedDate={selectedDate}
        onCalendarClick={onCalendarClick}
      />
      {errors.date && <MessageBox color="danger" messages={errors.date} />}
      <TimeTable>
        <h2>{t('상담 시간 선택')}</h2>
        <div className="time-buttons">
          {times.map((time) => (
            <TimeButton
              type="button"
              key={time}
              isSelected={selectedTime === time}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </TimeButton>
          ))}
        </div>
        {errors.time && <MessageBox color="danger" messages={errors.time} />}
        <ReservationInfoBox>
          <dl>
            <dt>{t('신청자')}</dt>
            <dd>
              <InfoBox
                type="text"
                name="name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                } // name 필드 업데이트
              />
              {errors.name && (
                <MessageBox color="danger" messages={errors.name} />
              )}
            </dd>
          </dl>
          <dl>
            <dt>{t('이메일')}</dt>
            <dd>
              <InfoBox
                type="email"
                name="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                } // email 필드 업데이트
              />
              {errors.email && (
                <MessageBox color="danger" messages={errors.email} />
              )}
            </dd>
          </dl>
          <dl>
            <dt>{t('연락처')}</dt>
            <dd>
              <InfoBox
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, mobile: e.target.value }))
                } // mobile 필드 업데이트
              />
              {errors.mobile && (
                <MessageBox color="danger" messages={errors.mobile} />
              )}
            </dd>
          </dl>
        </ReservationInfoBox>
        {errors.submit && (
          <MessageBox color="danger" messages={errors.submit} />
        )}
        <StyledButton type="submit" color="primary" onClick={onSubmit}>
          {t('예약 하기')}
        </StyledButton>
        {submissionSuccess && (
          <MessageBox
            color="success"
            messages={t('상담 예약을 완료했습니다.')}
          />
        )}
      </TimeTable>
    </FormBox>
  );
};

export default React.memo(PersonalCounselingForm);
