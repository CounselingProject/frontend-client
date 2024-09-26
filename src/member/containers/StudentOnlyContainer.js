'use client';
import React from 'react';
import LoginContainer from './LoginContainer';
import { getUserStates } from '@/commons/contexts/UserInfoContext';

const StudentOnlyContainer = ({ children }) => {
  const { isLogin, isStudent } = getUserStates();

  return (
    isLogin ? (
      isStudent ? (
        children
      ) : (
        <h2>학생만 이용할 수 있는 페이지입니다.</h2>
      )
    ) : (
      <LoginContainer />
    )
  );
};

export default React.memo(StudentOnlyContainer);
