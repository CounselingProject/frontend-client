'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from 'react-icons/io';
import { MemberStyledInput } from '@/commons/components/inputs/StyledInput';
import { MypageStyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import userType from '../constants/userType';
import userStatus from '../constants/userStatus';
import { StyledDt } from '@/commons/components/Mypage/StyledDt';
import { StyledH1 } from '@/commons/components/Mypage/StyledH1';

const FormBox = styled.form`
    display: flex;
    flex-direction: column; /* 자식 요소를 세로 방향으로 배치 */
    align-items: center; /* 자식 요소를 가로 가운데 정렬 */
    width: 100%; /* FormBox의 너비 설정 */
`;

const LeftAlignedDl = styled.dl`
    text-align: left; /* 텍스트 왼쪽 정렬 */
    width: 100%; /* 필요한 경우 너비 조정 */
    min-width: 600px;
    max-width: 700px;
`;


const JoinForm = ({
                    form,
                    errors,
                    onSubmit,
                    onChange,
                    onToggle,
                    skey,
                    professors,
                  }) => {
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <StyledH1>{t('회원가입')}</StyledH1>
      <LeftAlignedDl>
        <StyledDt>{t('가입유형')}</StyledDt>
        <dd>
          {Object.keys(userType)
            .filter((k) => k != 'ADMIN')
            .map((k, i) => (
              <span
                key={`userType_${k}`}
                onClick={() => onToggle('userType', k)}
              >
                {form?.userType === k ? (
                  <IoMdRadioButtonOn />
                ) : (
                  <IoMdRadioButtonOff />
                )}
                {userType[k]}
              </span>
            ))}
        </dd>
      </LeftAlignedDl>
      <dl>
        <StyledDt>{t('이메일')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="email"
            value={form?.email ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.email}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>{t('비밀번호')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="password"
            name="password"
            value={form?.password ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.password}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>{t('비밀번호_확인')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="password"
            name="confirmPassword"
            value={form?.confirmPassword ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">
            {errors?.confirmPassword}
          </StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>{t('회원명')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="userName"
            value={form?.userName ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.userName}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>{t('휴대전화번호')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="mobile"
            value={form?.mobile ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.mobile}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>{t('우편번호')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="zonecode"
            value={form?.zonecode ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.zonecode}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>{t('주소')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="address"
            value={form?.address ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.address}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>{t('나머지_주소')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="addresssub"
            value={form?.addresssub ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.addresssub}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>{t('생년월일')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="date"
            name="birth"
            value={form?.birth ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.birth}</StyledMessage>
        </dd>
      </dl>
      <LeftAlignedDl>
        <StyledDt>{t('성별')}</StyledDt>
        <dd>
          <span onClick={() => onToggle('gender', 'FEMALE')}>
            {form?.gender === 'FEMALE' ? (
              <IoMdRadioButtonOn />
            ) : (
              <IoMdRadioButtonOff />
            )}
            {t('여성')}
          </span>
          <span onClick={() => onToggle('gender', 'MALE')}>
            {form?.gender === 'MALE' ? (
              <IoMdRadioButtonOn />
            ) : (
              <IoMdRadioButtonOff />
            )}
            {t('남성')}
          </span>
          <StyledMessage variant="danger">{errors?.gender}</StyledMessage>
        </dd>
      </LeftAlignedDl>
      <LeftAlignedDl>
        <StyledDt>{form?.userType === 'STUDENT' ? t('재학상태') : t('재직상태')}</StyledDt>
        <dd>
          {form?.userType === 'STUDENT' ? (
            <>
              <span onClick={() => onToggle('status', 'ONCLASS')}>
                {form?.status === 'ONCLASS' ? (
                  <IoMdRadioButtonOn />
                ) : (
                  <IoMdRadioButtonOff />
                )}
                {userStatus.ONCLASS}
              </span>
              <span onClick={() => onToggle('status', 'OUTCLASS')}>
                {form?.status === 'OUTCLASS' ? (
                  <IoMdRadioButtonOn />
                ) : (
                  <IoMdRadioButtonOff />
                )}
                {userStatus.OUTCLASS}
              </span>
            </>
          ) : (
            <>
              <span onClick={() => onToggle('status', 'EMPLOYED')}>
                {form?.status === 'EMPLOYED' ? (
                  <IoMdRadioButtonOn />
                ) : (
                  <IoMdRadioButtonOff />
                )}
                {userStatus.EMPLOYED}
              </span>
              <span onClick={() => onToggle('status', 'LEAVE')}>
                {form?.status === 'LEAVE' ? (
                  <IoMdRadioButtonOn />
                ) : (
                  <IoMdRadioButtonOff />
                )}
                {userStatus.LEAVE}
              </span>
              <span onClick={() => onToggle('status', 'RESIGN')}>
                {form?.status === 'REGISN' ? (
                  <IoMdRadioButtonOn />
                ) : (
                  <IoMdRadioButtonOff />
                )}
                {userStatus.RESIGN}
              </span>
            </>
          )}
        </dd>
      </LeftAlignedDl>
      <dl>
        <StyledDt>{form?.userType === 'COUNSELOR' ? t('부서명') : t('학과명')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="deptNm"
            value={form?.deptNm ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.deptNm}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <StyledDt>
          {form?.userType === 'COUNSELOR' ? t('부서번호') : t('학과번호')}
        </StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="deptNo"
            value={form?.deptNo ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.deptNo}</StyledMessage>
        </dd>
      </dl>
      {form?.userType === 'STUDENT' ? (
        <>
          <dl>
            <StyledDt>{t('학번')}</StyledDt>
            <dd>
              <MemberStyledInput
                type="text"
                name="stdntNo"
                value={form?.stdntNo ?? ''}
                onChange={onChange}
              />
              <StyledMessage variant="danger">{errors?.stdntNo}</StyledMessage>
            </dd>
          </dl>
          <dl>
            <StyledDt>{t('학년')}</StyledDt>
            <dd>
              <MemberStyledInput
                type="text"
                name="grade"
                value={form?.grade ?? ''}
                onChange={onChange}
              />
              <StyledMessage variant="danger">{errors?.grade}</StyledMessage>
            </dd>
          </dl>
          <dl>
            <StyledDt>{t('지도교수')}</StyledDt>
            <dd>
              <MemberStyledInput
                type="text"
                name="skey"
                value={skey}
                onChange={onChange}
              />
              <div>
                <select
                  name="professor"
                  value={form?.professor}
                  onChange={onChange}
                >
                  {professors && professors.length > 0 ? (
                    professors.map(({ seq, userName, deptNm }) => (
                      <option key={seq} value={seq}>
                        {userName}({deptNm})
                      </option>
                    ))
                  ) : (
                    <option value="">{t('교수를_선택하세요')}</option>
                  )}
                </select>
              </div>
              <StyledMessage variant="danger">
                {errors?.professor}
              </StyledMessage>
            </dd>
          </dl>
        </>
      ) : (
        <>
          <dl>
            <StyledDt>{t('사번')}</StyledDt>
            <dd>
              <MemberStyledInput
                type="text"
                name="empNo"
                value={form?.empNo ?? ''}
                onChange={onChange}
              />
              <StyledMessage variant="danger">{errors?.empNo}</StyledMessage>
            </dd>
          </dl>
          <dl>
            <StyledDt>{t('담당과목')}</StyledDt>
            <dd>
              <MemberStyledInput
                type="text"
                name="subject"
                value={form?.subject ?? ''}
                onChange={onChange}
              />
              <StyledMessage variant="danger">{errors?.subject}</StyledMessage>
            </dd>
          </dl>
        </>
      )}
      <div
        className="agree"
        suppressHydrationWarning
        onClick={() => onToggle('agree', !Boolean(form?.agree))}
      >
        {form?.agree ? <FaCheckSquare /> : <FaRegCheckSquare />}
        {t('약관에_동의')}
      </div>
      <StyledMessage variant="danger">{errors?.agree}</StyledMessage>
      <MypageStyledButton type="submit" variant="green">
        {t('회원가입')}
      </MypageStyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(JoinForm);
