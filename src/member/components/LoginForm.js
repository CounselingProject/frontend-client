import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import StyledMessage from '@/commons/components/StyledMessage';
import { MemberStyledInput } from '@/commons/components/inputs/StyledInput';
import { StyledDt } from '@/commons/components/Mypage/StyledDt';
import { StyledButton } from '@/commons/components/buttons/StyledButton';

const FormBox = styled.form`
  display: flex;
  flex-direction: column; /* 자식 요소를 세로 방향으로 배치 */
  align-items: center; /* 자식 요소를 가로 가운데 정렬 */
  width: 100%; /* FormBox의 너비 설정 */
`;

const LoginForm = ({ form, errors, onSubmit, onChange }) => {
  const { t } = useTranslation();

  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <dl>
        <StyledDt>{t('이메일')}</StyledDt>
        <dd>
          <MemberStyledInput
            type="text"
            name="email"
            value={form?.email || ''}
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
            value={form?.password || ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.password}</StyledMessage>
        </dd>
      </dl>
      <StyledButton type="submit" variant="primary">
        {t('로그인')}
      </StyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(LoginForm);
