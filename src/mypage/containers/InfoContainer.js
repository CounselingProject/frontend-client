'use client';
import React, { useEffect, useState } from 'react';
import ProfileInfo from '../components/ProfileInfo'; // 프로필 정보를 표시하는 컴포넌트
import { getMemberInfo } from '@/member/apis/apiInfo'; // 회원 정보 조회 함수

const InfoContainer = () => {
  const [memberInfo, setMemberInfo] = useState({}); // 회원 정보 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    (async () => {
      try {
        const info = await getMemberInfo(); // 회원 정보 조회
        setMemberInfo(info); // 회원 정보를 상태에 저장
        //console.log('Fetched info:', info); // 이 시점에서 info는 올바르게 출력될 것
      } catch (err) {
        console.error(err); // 에러 로그 출력
      } finally {
        setLoading(false); // 로딩 완료
      }
    })();
  }, []); // 컴포넌트 마운트 시 한번만 실행

  // 상태가 업데이트된 후 값을 확인하는 useEffect
  useEffect(() => {
    if (memberInfo) {
      //console.log('Updated memberInfo:', memberInfo); // 상태가 변경된 후 출력
    }
  }, [memberInfo]); // memberInfo가 변경될 때마다 실행

  return (
    <ProfileInfo memberInfo={memberInfo} loading={loading} /> // ProfileInfo에 회원 정보와 로딩 상태 전달
  );
};

export default React.memo(InfoContainer);
