import React from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { BiSolidCalendar } from 'react-icons/bi';
import 'react-calendar/dist/Calendar.css';

const CalendarWrapper = styled.div`
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
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 0 170px;
  }

  .react-calendar__navigation button {
    color: #ff3d00;
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
    color: #ff3d00;
  }

  /* 날짜 스타일 */
  .react-calendar__tile {
    font-size: 1.2rem;
    padding: 15px 0;

    &:hover,
    &:focus,
    &.react-calendar__tile--active {
      background: #ff3d00;
      color: #ffffff;
      border-radius: 10px;
    }
  }

  .react-calendar__tile--now {
    background: #ffcccb;
    color: #d32f2f;
    border-radius: 10px;
  }

  .react-calendar__tile--active {
    background: #ff3d00;
    color: #ffffff;
    border-radius: 7%;
  }

  .react-calendar__tile:hover {
    background: #ffcccb;
    border-radius: 7%;
  }

  .react-calendar__navigation button {
    color: #ff3d00;
    min-width: 44px;
    background: none;
    font-size: 1.2rem;
    margin-top: 8px;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: bold;
    color: #ff3d00;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d32f2f;
  }
`;

const TitleCalendar = styled.h2`
  display: flex;
  align-items: center;
  margin: 30px 0px 15px 30px;

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
        value={selectedDate} // 신청 선택 날짜 표시
        minDate={startDate}
        maxDate={endDate}
        tileDisabled={({ date }) => {
          const dayOfWeek = date.getDay();
          return dayOfWeek === 0 || dayOfWeek === 6; // 0 (일요일) ~ 6 (토요일) -> 주말인 경우 비활성화
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
