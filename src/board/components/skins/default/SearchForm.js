import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  StyledInput,
  StyledSelect,
} from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';

const FormBox = styled.form`
  display: flex;
  justify-content: center; /* 중앙 정렬 추가 */
  align-items: center; /* 수직 중앙 정렬 추가 */
  margin: 20px 0; /* 상하 여백 추가 */

  select {
    width: 120px;
  }

  button {
    width: 130px;
  }

  input[type='text'] {
    flex-grow: 1;
    margin-left: 10px; /* 검색어 입력창과 버튼 간의 간격 추가 */
  }
`;

const SearchForm = ({ form, onSubmit, onChange }) => {
  const { t } = useTranslation();
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <StyledSelect name="sopt" value={form?.sopt ?? ''} onChange={onChange}>
        <option value="ALL">{t('통합검색')}</option>
        <option value="SUBJECT">{t('제목')}</option>
        <option value="CONTENT">{t('내용')}</option>
        <option value="SUBJECT_CONTENT">{t('제목+내용')}</option>
        <option value="NAME">{t('이름')}</option>
      </StyledSelect>
      <StyledInput
        type="text"
        name="skey"
        value={form?.skey ?? ''}
        onChange={onChange}
        placeholder={t('검색어를_입력하세요.')}
      />
      <StyledButton type="submit" variant="black">
        {t('검색하기')}
      </StyledButton>
    </FormBox>
  );
};

export default React.memo(SearchForm);
