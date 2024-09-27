'use client';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaRegCheckSquare, FaCheckSquare } from 'react-icons/fa';
import classNames from 'classnames';
import { getUserStates } from '@/commons/contexts/UserInfoContext';
import {
  StyledInput,
  StyledTextarea,
} from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';

const FormBox = styled.form``;

const CategoryTab = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.black};
  display: inline-block;
  padding: 7px 10px;
  border-radius: 5px;
  cursor: pointer;

  &.on {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }

  & + & {
    margin-left: 5px;
  }
`;

const ReviewForm = ({
  form,
  errors,
  board,
  onChange,
  onClick,
  onSubmit,
  onFileDelete,
}) => {
  const { t } = useTranslation();
  const [editor, setEditor] = useState(null);
  const { isAdmin } = getUserStates();

  const insertImageCallback = useCallback(
    (files) => {
      if (!files || files.length === 0) {
        return;
      }

      const source = files.map((file) => file.fileUrl);

      editor.execute('insertImage', { source });

      const editorImages = form?.editorImages ?? [];
      editorImages.push(...files);
      onChange({ target: { name: 'editorImages', value: editorImages } });
    },
    [editor, form, onChange],
  );
  return (
    <FormBox onSubmit={onSubmit} autoComplete="off">
      <dl>
        <dt>{t('제목')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="subject"
            value={form?.subject ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.subject}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('작성자')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="poster"
            value={form?.poster ?? ''}
            onChange={onChange}
          />
          <StyledMessage variant="danger">{errors?.poster}</StyledMessage>
        </dd>
      </dl>
      {isAdmin && (
        <dl>
          <dt>{t('공지글')}</dt>
          <dd>
            <span onClick={() => onClick('notice', !Boolean(form?.notice))}>
              {form?.notice ? <FaCheckSquare /> : <FaRegCheckSquare />}
              {t('공지글로_등록하기')}
            </span>
          </dd>
        </dl>
      )}
      <dl>
        <dt>{t('내용')}</dt>
        <dd>
          {board?.useEditor ? (
            <h1>에디터</h1>
          ) : (
            <StyledTextarea
              name="content"
              value={form?.content ?? ''}
              onChange={onChange}
            ></StyledTextarea>
          )}
          <StyledMessage variant="danger">{errors?.content}</StyledMessage>
        </dd>
      </dl>
      <StyledButton type="submit" variant="green">
        {form?.mode === 'update' ? t('수정하기') : t('작성하기')}
      </StyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(ReviewForm);
