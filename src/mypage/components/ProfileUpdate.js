'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { StyledDt } from '@/commons/components/Mypage/StyledDt';
import { StyledDd } from '@/commons/components/Mypage/StyledDd';
import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { MypageStyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import userType from '@/member/constants/userType';
import FileUpload from '@/commons/components/FileUpload';
import { StyledH1 } from '@/commons/components/Mypage/StyledH1';

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; /* 버튼을 가운데 정렬 */
  margin-top: 20px; /* 버튼과 위 요소들 간의 간격 */
`;


// StyledFileUpload 정의
const StyledFileUpload = styled(FileUpload)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.green};
  overflow: hidden;
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.green};
  }
`;

const FormBox = styled.form``;

// dl 태그 대신 사용할 DlContainer
const DlContainer = styled.dl`
  display: flex;
  flex-direction: column;
  align-items: center; /* 자식 요소들을 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
`;

const ProfileUpdate = ({
                         form,
                         errors,
                         onSubmit,
                         onChange,
                         fileUploadCallback,
                       }) => {
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <StyledH1>{t('개인정보 수정')}</StyledH1>

      {/* DlContainer로 변경 */}
      <DlContainer>
        <StyledDt>{t('프로필 이미지')}</StyledDt>
        <StyledFileUpload
          imageOnly={true}
          gid={form?.gid}
          single={true}
          done={true}
          width={400}
          color="green"
          imageUrl={form?.profileImage}
          callback={fileUploadCallback}
        >
          {t('이미지 첨부')}
        </StyledFileUpload>
      </DlContainer>

      <Container>
        <LeftSection>
          <dl>
            <StyledDt>{t('이름')}</StyledDt>
            <StyledDd>{form?.userName}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('회원유형')}</StyledDt>
            <StyledDd>{userType[form?.userType]}</StyledDd>
          </dl>
          {/* STUDENT / EMPLOYEE에 따른 추가 입력 */}
          {form?.userType === 'STUDENT' ? (
            <>
              <dl>
                <StyledDt>{t('지도교수')}</StyledDt>
                <StyledDd>
                  {form?.professor?.userName || t('지도교수 없음')}
                </StyledDd>
              </dl>
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
                <StyledInput
                  type="text"
                  name="empNo"
                  value={form?.empNo ?? ''}
                  onChange={onChange}
                />
                <StyledMessage variant="danger">{errors?.empNo}</StyledMessage>
              </dl>
              <dl>
                <StyledDt>{t('담당 과목')}</StyledDt>
                <StyledInput
                  type="text"
                  name="subject"
                  value={form?.subject ?? ''}
                  onChange={onChange}
                />
                <StyledMessage variant="danger">
                  {errors?.subject}
                </StyledMessage>
              </dl>
            </>
          )}

          <dl>
            <StyledDt>{t('이메일')}</StyledDt>
            <StyledDd>{form?.email}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('생년월일')}</StyledDt>
            <StyledDd>{form?.birth}</StyledDd>
          </dl>
          <dl>
            <StyledDt>{t('성별')}</StyledDt>
            <StyledDd>
              {form?.gender === 'FEMALE' ? t('여성') : t('남성')}
            </StyledDd>
          </dl>
        </LeftSection>

        <RightSection>
          <dl>
            <StyledDt>{t('비밀번호')}</StyledDt>
            <StyledInput
              type="password"
              name="password"
              value={form?.password ?? ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">{errors?.password}</StyledMessage>
          </dl>
          <dl>
            <StyledDt>{t('비밀번호 확인')}</StyledDt>
            <StyledInput
              type="password"
              name="confirmPassword"
              value={form?.confirmPassword ?? ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">
              {errors?.confirmPassword}
            </StyledMessage>
          </dl>
          <dl>
            <StyledDt>{t('휴대전화번호')}</StyledDt>
            <StyledInput
              type="text"
              name="mobile"
              value={form?.mobile ?? ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">{errors?.mobile}</StyledMessage>
          </dl>
          <dl>
            <StyledDt>{t('우편번호')}</StyledDt>
            <StyledInput
              type="text"
              name="zonecode"
              value={form?.zonecode ?? ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">{errors?.zonecode}</StyledMessage>
          </dl>
          <dl>
            <StyledDt>{t('주소')}</StyledDt>
            <StyledInput
              type="text"
              name="address"
              value={form?.address ?? ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">{errors?.address}</StyledMessage>
          </dl>
          <dl>
            <StyledDt>{t('세부 주소')}</StyledDt>
            <StyledInput
              type="text"
              name="addresssub"
              value={form?.addresssub ?? ''}
              onChange={onChange}
            />
            <StyledMessage variant="danger">{errors?.addresssub}</StyledMessage>
          </dl>
        </RightSection>
      </Container>

      <ButtonWrapper>
        <MypageStyledButton type="submit" variant="green">
          {t('회원정보 수정')}
        </MypageStyledButton>
      </ButtonWrapper>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(ProfileUpdate);
