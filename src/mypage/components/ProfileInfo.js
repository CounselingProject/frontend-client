'use client';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { StyledDt } from '@/commons/components/Mypage/StyledDt';
import { StyledDd } from '@/commons/components/Mypage/StyledDd';
import { useTranslation } from 'next-i18next';
import StyledMessage from '@/commons/components/StyledMessage';
import userType from '@/member/constants/userType';
import FileUpload from '@/commons/components/FileUpload';

// StyledFileUpload 정의
const StyledFileUpload = styled(FileUpload)`
    display: flex; /* flexbox를 사용하여 이미지 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    border-radius: 50%; /* 원형 테두리 */
    border: 2px solid ${({ theme }) => theme.colors.primary}; /* 테두리 색상 */
    overflow: hidden; /* 이미지가 테두리 영역을 넘어가지 않도록 설정 */
    width: 100px; /* 너비 */
    height: 100px; /* 높이 */
    background-color: ${({ theme }) => theme.colors.gray}; /* 배경색 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */

    img {
        width: 100%; /* 이미지 너비 */
        height: 100%; /* 이미지 높이 */
        object-fit: cover; /* 이미지 비율 유지 */
    }

    &:hover {
        border-color: ${({ theme }) => theme.colors.secondary}; /* 호버 시 테두리 색상 변화 */
    }
`;

// 마이페이지 - 메인
const FormBox = styled.form``;

const ProfileInfo = ({
                       form,
                       errors,
                       fileUploadCallback
                     }) => {
  const { t } = useTranslation();

  const FormBox = styled.form`
  pointer-events: none; /* 전체 폼을 비활성화 (필요 시) */
`;

  return (
    <FormBox autoComplete="off">
      <dl>
        <StyledDt>{t('프로필_이미지')}</StyledDt>
          <StyledFileUpload
            imageOnly={true}
            gid={form?.gid}
            single={true}
            done={true}
            width={400}
            color="primary"
            imageUrl={form?.profileImage}
            callback={fileUploadCallback}
          >
            {t('이미지_첨부')}
          </StyledFileUpload>
      </dl>
      <dl>
        <StyledDt>{t('회원유형')}</StyledDt>
        <StyledDd>{userType[form?.userType]}</StyledDd>
      </dl>
      <dl>
        <StyledDt>{t('이메일')}</StyledDt>
        <StyledDd>{form?.email}</StyledDd>
      </dl>

      <dl>
        <StyledDt>{t('회원명')}</StyledDt>
        <StyledDd>{form?.userName}</StyledDd>
      </dl>

      <dl>
        <StyledDt>{t('휴대전화번호')}</StyledDt>
        <StyledDd>{form?.mobile}</StyledDd>
      </dl>

      <dl>
        <StyledDt>{t('우편번호')}</StyledDt>
        <StyledDd>{form?.zonecode}</StyledDd>
      </dl>

      <dl>
        <StyledDt>{t('주소')}</StyledDt>
        <StyledDd>{form?.address}</StyledDd>
      </dl>

      <dl>
        <StyledDt>{t('나머지_주소')}</StyledDt>
        <StyledDd>{form?.addresssub}</StyledDd>
      </dl>

      <dl>
        <StyledDt>{t('생년월일')}</StyledDt>
        <StyledDd>{form?.birth}</StyledDd>
      </dl>

      <dl>
        <StyledDt>{t('성별')}</StyledDt>
        <StyledDd>{form?.gender === 'FEMALE' ? t('여성') : t('남성')}</StyledDd>
      </dl>

      {form?.userType === 'STUDENT' ? (
        <>
          <dl>
            <StyledDt>{t('학번')}</StyledDt>
            <StyledDd>{form?.stdntNo}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('학년')}</StyledDt>
            <StyledDd>{form?.grade}</StyledDd>
          </dl>
        </>
      ) : (
        <>
          <dl>
            <StyledDt>{t('사번')}</StyledDt>
            <StyledDd>{form?.empNo}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('담당 과목')}</StyledDt>
            <StyledDd>{form?.subject}</StyledDd>
          </dl>
        </>
      )}
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(ProfileInfo);
