'use client';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaRegCheckSquare, FaCheckSquare } from 'react-icons/fa';
import { AiFillNotification } from 'react-icons/ai';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // ClassicEditor import 추가
import { getUserStates } from '@/commons/contexts/UserInfoContext';
import {
  StyledInput,
  StyledTextarea,
} from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import FileUpload from '@/commons/components/FileUpload';
import FileItems from '@/commons/components/FileItems';
import { set } from 'date-fns';

const FormBox = styled.form`
  background: ${({ theme }) => theme.colors.lightGray};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.green};
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
`;

const CategoryTab = styled.span`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 15px 0;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  background: ${({ theme, active }) =>
    active ? theme.colors.black : '#005d4f'};
  color: ${({ theme, active }) =>
    active ? theme.colors.white : theme.colors.white};
  transition: background 0.3s, color 0.3s, transform 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.white};
    transform: scale(1.05);
  }
`;

const StyledDl = styled.dl`
  margin: 15px 0;

  dt {
    font-weight: bold;
    font-size: 1.2em;
    margin-bottom: 10px;
  }

  dd {
    margin: 0;
  }
`;

const NoticeButton = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: red;
  }
`;

const StyledSubmitButton = styled(StyledButton)`
  display: block;
  margin: 20px auto 0 auto; /* 버튼을 중앙으로 정렬 */
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
      <Title>
        {form?.mode === 'update' ? t('게시글_수정') : t('게시글_작성')}
      </Title>
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
            placeholder={t('제목을_입력하세요')}
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
            placeholder={t('작성자를_입력하세요')}
          />
          <StyledMessage variant="danger">{errors?.poster}</StyledMessage>
        </dd>
      </StyledDl>
      {isAdmin && (
        <StyledDl>
          <dt>{t('공지글')}</dt>
          <dd>
            <NoticeButton
              onClick={() => onClick('notice', !Boolean(form?.notice))}
            >
              <AiFillNotification
                style={{
                  marginRight: '5px',
                  verticalAlign: 'middle',
                  color: 'red',
                  fontSize: '1.5em',
                }}
              />
              {form?.notice ? (
                <FaCheckSquare style={{ marginRight: '5px' }} />
              ) : (
                <FaRegCheckSquare style={{ marginRight: '5px' }} />
              )}
              {t('공지글로_등록하기')}
            </NoticeButton>
          </dd>
        </StyledDl>
      )}
      <StyledDl>
        <dt>{t('내용')}</dt>
        <dd>
          {board?.useEditor ? (
            <CKEditor
              editor={ClassicEditor}
              config={{
                height: 400,
              }}
              data={form?.content}
              onReady={(editor) => {
                setEditor(editor);
              }}
              onChange={(_, editor) => {
                onChange({
                  target: { name: 'content', value: editor.getData() },
                });
              }}
            />
          ) : (
            <StyledTextarea
              name="content"
              value={form?.content ?? ''}
              onChange={onChange}
              placeholder={t('내용을_입력하세요')}
            />
          )}
          <FileUpload
            imageOnly={true}
            gid={form?.gid}
            color="green"
            location="editor"
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
      <StyledSubmitButton type="submit" variant="green">
        {form?.mode === 'update' ? t('수정하기') : t('작성하기')}
      </StyledSubmitButton>
      <StyledMessage variant="danger">{errors?.global}</StyledMessage>
    </FormBox>
  );
};

export default React.memo(DefaultForm);
