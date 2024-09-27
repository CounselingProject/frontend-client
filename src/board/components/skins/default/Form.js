'use client';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaRegCheckSquare, FaCheckSquare } from 'react-icons/fa';
import { AiFillNotification } from 'react-icons/ai'; // 아이콘 import
import classNames from 'classnames';
import { getUserStates } from '@/commons/contexts/UserInfoContext';
import {
  StyledInput,
  StyledTextarea,
} from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import FileUpload from '@/commons/components/FileUpload';
import FileItems from '@/commons/components/FileItems';

const FormBox = styled.form`
  background: ${({ theme }) => theme.colors.lightGray};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto; /* 중앙 정렬을 위한 여백 설정 */
  width: 100%; /* 화면 크기에 맞게 폭 조정 */
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 5px; /* 카테고리 간의 간격 */
  margin-bottom: 15px; /* 카테고리 아래 여백 */
`;

const CategoryTab = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ theme, active }) => (active ? theme.colors.black : theme.colors.white)};
  color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.black)};
  transition: background 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
    transform: scale(1.05); /* 호버 시 크기 확대 */
  }
`;

const StyledDl = styled.dl`
  margin: 15px 0;

  dt {
    font-weight: bold;
    margin-bottom: 5px;
  }

  dd {
    margin: 0;
  }
`;

const DefaultForm = ({
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
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>게시글 작성</h1> {/* 제목 추가 */}
      
      {board?.category && (
        <StyledDl>
          <dt>{t('분류')}</dt>
          <dd>
            <CategoryContainer>
              {board.category.split('\n').map((c) => (
                <CategoryTab
                  key={`category_${c}`}
                  active={c === form?.category}
                  onClick={() => onClick('category', c)}
                >
                  {c.replace('\r')}
                </CategoryTab>
              ))}
            </CategoryContainer>
          </dd>
        </StyledDl>
      )}
      <StyledDl>
        <dt>{t('제목')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="subject"
            value={form?.subject ?? ''}
            onChange={onChange}
            placeholder={t('제목을 입력하세요')}
          />
          <StyledMessage variant="danger">{errors?.subject}</StyledMessage>
        </dd>
      </StyledDl>
      <StyledDl>
        <dt>{t('작성자')}</dt>
        <dd>
          <StyledInput
            type="text"
            name="poster"
            value={form?.poster ?? ''}
            onChange={onChange}
            placeholder={t('작성자를 입력하세요')}
          />
          <StyledMessage variant="danger">{errors?.poster}</StyledMessage>
        </dd>
      </StyledDl>
      {isAdmin && (
        <StyledDl>
          <dt>{t('공지글')}</dt>
          <dd>
            <span onClick={() => onClick('notice', !Boolean(form?.notice))}>
              <AiFillNotification style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              {form?.notice ? <FaCheckSquare /> : <FaRegCheckSquare />}
              {t('공지글로_등록하기')}
            </span>
          </dd>
        </StyledDl>
      )}
      <StyledDl>
        <dt>{t('내용')}</dt>
        <dd>
          {board?.useEditor ? (
            <h1>에디터</h1>
          ) : (
            <StyledTextarea
              name="content"
              value={form?.content ?? ''}
              onChange={onChange}
              placeholder={t('내용을 입력하세요')}
            />
          )}
          <FileUpload
            imageOnly={true}
            gid={form?.gid}
            color="primary"
            callback={insertImageCallback}
          >
            {t('이미지_첨부')}
          </FileUpload>
          {form?.editorImages && (
            <FileItems files={form.editorImages} onDelete={onFileDelete} />
          )}
          <StyledMessage variant="danger">{errors?.content}</StyledMessage>
        </dd>
      </StyledDl>
      <StyledButton type="submit" variant="primary">
        {form?.mode === 'update' ? t('수정하기') : t('작성하기')}
      </StyledButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(DefaultForm);
