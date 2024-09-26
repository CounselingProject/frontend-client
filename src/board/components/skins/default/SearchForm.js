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
  select {
    width: 120px;
  }

  button {
    width: 130px;
  }

  input[type='text'] {
    flex-grow: 1;
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
