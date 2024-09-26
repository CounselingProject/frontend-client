'use client';
import React from 'react';
import styled from 'styled-components';
import LoginContainer from './LoginContainer';
import { getUserStates } from '@/commons/contexts/UserInfoContext';

// 스타일링된 컴포넌트
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const MessageImage = styled.img`
  width: 300px; /* 이미지 크기 조절 */
  margin-bottom: 20px; /* 이미지와 텍스트 사이 여백 */
`;

const MessageText = styled.h2`
  font-size: 1.5rem;
`;

const BackButton = styled.a`
  display: inline-block; /* 버튼 형태로 */
  margin-top: 20px; /* 위쪽 여백 */
  padding: 10px 20px; /* 내부 여백 */
  background-color: #005d4f; /* 버튼 배경색 */
  color: #fff; /* 버튼 텍스트 색 */
  border-radius: 5px; /* 모서리 둥글게 */
  text-decoration: none; /* 밑줄 제거 */
  font-weight: bold; /* 글씨 두껍게 */
  
  &:hover {
    background-color: #004d44; /* hover 시 색상 변경 */
  }
`;

const StudentOnlyContainer = ({ children }) => {
  const { isLogin, isStudent } = getUserStates();

  return (
    isLogin ? (
      isStudent ? (
        children
      ) : (
        <MessageContainer>
          <MessageImage src="/images/psychologicalTest/OnlyStudent.png" alt="학생만 이용 가능" />
          <MessageText>학생만 이용할 수 있는 페이지입니다.</MessageText>
          <BackButton href="/psychologicalTest/list">이전 페이지로 돌아가기</BackButton>
        </MessageContainer>
      )
    ) : (
      <LoginContainer />
    )
  );
};

export default React.memo(StudentOnlyContainer);
