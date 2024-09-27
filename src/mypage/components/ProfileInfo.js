'use client';
import React from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { StyledH1 } from '@/commons/components/Mypage/StyledH1';
import { StyledDt } from '@/commons/components/Mypage/StyledDt';
import { StyledDd } from '@/commons/components/Mypage/StyledDd';
import StyledMessage from '@/commons/components/StyledMessage';
import userType from '@/member/constants/userType';
import FileUpload from '@/commons/components/FileUpload';

// 전체 레이아웃을 위한 스타일드 컴포넌트
const Container = styled.div`
  display: flex; /* 좌우로 나누기 위해 flexbox 사용 */
  justify-content: space-between; /* 좌우 공간을 고르게 분배 */
  gap: 20px; /* 두 섹션 간의 간격 */
`;

const LeftSection = styled.div`
  flex: 1; /* 왼쪽 섹션 크기 조정 */
`;

const RightSection = styled.div`
  flex: 1; /* 오른쪽 섹션 크기 조정 */
`;

// StyledFileUpload 정의
const StyledFileUpload = styled(FileUpload)`
  display: flex; /* flexbox를 사용하여 이미지 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  border-radius: 50%; /* 원형 테두리 */
  border: 2px solid ${({ theme }) => theme.colors.green}; /* 테두리 색상 */
  overflow: hidden; /* 이미지가 테두리 영역을 넘어가지 않도록 설정 */
  width: 200px; /* 너비 */
  height: 200px; /* 높이 */
  background-color: ${({ theme }) => theme.colors.white}; /* 배경색 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  margin-top: 5px;
  margin-bottom: 15px;

  img {
    width: 100%; /* 이미지 너비 */
    height: 100%; /* 이미지 높이 */
    object-fit: cover; /* 이미지 비율 유지 */
  }
`;

// dl 태그 대신 사용할 DlContainer
const DlContainer = styled.dl`
  display: flex;
  flex-direction: column;
  align-items: center; /* 자식 요소들을 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
`;


// 마이페이지 - 메인
const FormBox = styled.form``;

const ProfileInfo = ({ memberInfo, errors }) => {
  const { t } = useTranslation();

  // memberInfo.data가 존재하는지 확인하고, 데이터를 접근하도록 변경
  const data = memberInfo;

  return (
    <FormBox autoComplete="off">
      <StyledH1>{t('마이페이지')}</StyledH1>
      <DlContainer>
        <StyledDt>{t('프로필 이미지')}</StyledDt>
        <StyledFileUpload
          imageOnly={true}
          gid={data?.gid}
          single={true}
          done={true}
          width={400}
          color="green"
          imageUrl={data?.profileImage}
        >
          {t('이미지 첨부')}
        </StyledFileUpload>
      </DlContainer>

      <Container>
        <LeftSection>
          <dl>
            <StyledDt>{t('이름')}</StyledDt>
            <StyledDd>{data?.userName}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('회원유형')}</StyledDt>
            <StyledDd>{userType[data?.userType]}</StyledDd>
          </dl>
          {data?.userType === 'STUDENT' ? (
            <>
              <dl>
                <StyledDt>{t('지도 교수')}</StyledDt>
                <StyledDd>
                  {data?.professor?.userName
                    ? data.professor.userName
                    : t('지도 교수 없음')}
                </StyledDd>
                {/* 교수 정보가 없으면 '지도 교수 없음' 출력 */}
              </dl>
              <dl>
                <StyledDt>{t('학번')}</StyledDt>
                <StyledDd>{data?.stdntNo}</StyledDd>
              </dl>
              <dl>
                <StyledDt>{t('학년')}</StyledDt>
                <StyledDd>{data?.grade}</StyledDd>
              </dl>
            </>
          ) : (
            <>
              <dl>
                <StyledDt>{t('사번')}</StyledDt>
                <StyledDd>{data?.empNo}</StyledDd>
              </dl>
              <dl>
                <StyledDt>{t('담당 과목')}</StyledDt>
                <StyledDd>{data?.subject}</StyledDd>
              </dl>
            </>
          )}
          <dl>
            <StyledDt>{t('이메일')}</StyledDt>
            <StyledDd>{data?.email}</StyledDd>
          </dl>
        </LeftSection>

        <RightSection>
          <dl>
            <StyledDt>{t('휴대전화번호')}</StyledDt>
            <StyledDd>{data?.mobile}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('우편번호')}</StyledDt>
            <StyledDd>{data?.zonecode}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('주소')}</StyledDt>
            <StyledDd>{data?.address}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('세부 주소')}</StyledDt>
            <StyledDd>{data?.addresssub}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('생년월일')}</StyledDt>
            <StyledDd>{data?.birth}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('성별')}</StyledDt>
            <StyledDd>
              {data?.gender === 'FEMALE' ? t('여성') : t('남성')}
            </StyledDd>
          </dl>
        </RightSection>
      </Container>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(ProfileInfo);
