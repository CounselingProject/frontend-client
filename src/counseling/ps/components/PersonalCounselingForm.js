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
  background: ${({ isSelected }) => (isSelected ? '#005d4f' : '#ffffff')};
  color: ${({ isSelected }) => (isSelected ? '#ffffff' : '#005d4f')};
  border: 1px solid ${({ theme }) => theme.colors.green};
  border-radius: 5px;
  width: 110px;
  padding: 10px 20px;
  margin: 5px 5px 20px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.green};
    color: #ffffff;
  }
`;

const ReservationInfoBox = styled.dl`
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;

  & > dl {
    display: flex;
    align-items: center; /* 수직 정렬 */
    margin-bottom: 10px;
  }

  dt {
    margin-right: 10px;
    white-space: nowrap;
  }

  dd {
    width: 91%;
    margin: 7px 0 0 0;
  }
`;

const Title = styled.h2`
  text-align: center; /* 가운데 정렬 */
`;

const PersonalCounselingForm = ({
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
        <Title>{t('상담 시간 선택')}</Title>
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
            <dt>{t('상담 신청자명')}</dt>
            <dd>
              <InfoBox
                type="text"
                name="name"
                value={form.name}
                placeholder={t('예) 김이름')} // 기본 텍스트 추가
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              {errors.name && (
                <MessageBox color="danger" messages={errors.name} />
              )}
            </dd>
          </dl>
          <dl>
            <dt>{t('신청자 이메일')}</dt>
            <dd>
              <InfoBox
                type="email"
                name="email"
                value={form.email}
                placeholder={t('예) user01@test.org')} // 기본 텍스트 추가
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              {errors.email && (
                <MessageBox color="danger" messages={errors.email} />
              )}
            </dd>
          </dl>
          <dl>
            <dt>{t('신청자 연락처')}</dt>
            <dd>
              <InfoBox
                type="tel"
                name="mobile"
                value={form.mobile}
                placeholder={t('예) 010-1000-1000')} // 기본 텍스트 추가
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, mobile: e.target.value }))
                }
              />
              {errors.mobile && (
                <MessageBox color="danger" messages={errors.mobile} />
              )}
            </dd>
          </dl>
          <dl>
            <dt>{t('상담 신청 사유')}</dt>
            <dd>
              <InfoBox
                type="text"
                name="reason"
                value={form.reason}
                placeholder={t(
                  '예) 교수 상담 - 수강 과목, 장학금, 학교 생활 등 / 취업 상담 - 자기소개서, 취업 연계, 인턴 등 / 심리 상담 - 범불안장애, 스트레스, 대인 공포증, 인터넷 및 스파트폰 중독 등',
                )} // 기본 텍스트 추가
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, reason: e.target.value }))
                }
              />
              {errors.reason && (
                <MessageBox color="danger" messages={errors.reason} />
              )}
            </dd>
          </dl>
          <dl>
            <dt>{t('개인 상담 종류')}</dt>
            <dd>
              <InfoBox
                type="text"
                name="category"
                value={form.category}
                placeholder={t(
                  '개인 상담 유형 교수 상담의 경우에는 PROFESSOR , 취업 상담의 경우에는 EMPLOYMENT , 심리 상담의 경우에는 PSYCHOLOGICAL 로 입력해주세요.',
                )} // 기본 텍스트 추가
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
              />
              {errors.category && (
                <MessageBox color="danger" messages={errors.category} />
              )}
            </dd>
          </dl>
        </ReservationInfoBox>
        {errors.submit && (
          <MessageBox color="danger" messages={errors.submit} />
        )}
        <StyledButton type="submit" color="green" onClick={onSubmit}>
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
