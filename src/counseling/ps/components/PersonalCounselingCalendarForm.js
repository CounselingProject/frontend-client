import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { BiSolidCalendar } from 'react-icons/bi';
import 'react-calendar/dist/Calendar.css';

const CalendarWrapper = styled.div`~
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  font-weight: bold;
  width: 100%;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 100%;
  border: none;

  /* < > 표시 */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 170px;
    margin: 3px;
  }

  .react-calendar__navigation button {
    color: ${({ theme }) => theme.colors.blue};
    background: none;
    font-size: 1.5rem;
    font-weight: bold;
    flex: 1;
    max-width: 43%;
    text-align: center;
  }

  /* 요일 이름 스타일 */
  .react-calendar__month-view__weekdays {
    font-size: 1.2rem;
    margin-bottom: 10px;
    text-align: center;
    font-weight: bold;
  }

  /* 날짜 스타일 */
  .react-calendar__tile {
    font-size: 1.2rem;
    padding: 15px 0;

    &:hover,
    &:focus,
    &.react-calendar__tile--active {
      background: ${({ theme }) => theme.colors.blue};
      color: ${({ theme }) => theme.colors.white};
    }
  }

  .react-calendar__tile--now {
    // 오늘 날짜 색상
    background: ${({ theme }) => theme.colors.beige};
    color: ${({ theme }) => theme.colors.green};
  }

  .react-calendar__tile--active {
    // 날짜 선택 시 색상
    background: ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.white};
  }

  .react-calendar__tile:hover {
    background: ${({ theme }) => theme.colors.green};
  }

  .react-calendar__navigation button {
    // N월 글자 색상
    color: ${({ theme }) => theme.colors.blue};
    min-width: 44px;
    background: none;
    font-size: 1.2rem;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.blue};
    padding: 0.7em;
    margin-bottom: 0;
  }

  .react-calendar__month-view__days__day {
    padding: 20px 10px;
  }

  .react-calendar__month-view__days__day--weekend {
    // 주말 날짜 색상
    color: ${({ theme }) => theme.colors.green};
  }
`;

const TitleCalendar = styled.h2`
  display: flex;
  align-items: center;
  margin: 0 0px 40px 30px;
  justify-content: center;

  svg {
    margin-right: 7px;
    font-size: 2.2rem;
    margin-bottom: 5px;
  }

  h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

const PersonalCounselingCalendarForm = ({
  startDate,
  endDate,
  selectedDate, // 상담 신청 날짜 prop로 받음
  onCalendarClick,
}) => {
  return (
    <CalendarWrapper>
      <TitleCalendar>
        <BiSolidCalendar />
        <h2>상담 날짜를 선택해 주세요.</h2>
      </TitleCalendar>

      <StyledCalendar
        onChange={onCalendarClick}
        value={selectedDate} // 선택된 날짜 표시
        minDate={startDate}
        maxDate={endDate}
        tileDisabled={({ date }) => {
          const dayOfWeek = date.getDay();
          return dayOfWeek === 0 || dayOfWeek === 6; // 0 (일요일) ~ 6 (토요일) -> 주말인 경우 비활성화 (상담 신청 불가)
        }}
        prevLabel="<"
        nextLabel=">"
        navigationLabel={null}
        next2Label={null}
        prev2Label={null}
      />
    </CalendarWrapper>
  );
};

export default PersonalCounselingCalendarForm;
