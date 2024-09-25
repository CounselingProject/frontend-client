'use client';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Image,
  ImageInsert,
} from 'ckeditor5';

import { StyledInput } from '@/commons/components/inputs/StyledInput';
import { StyledButton } from '@/commons/components/buttons/StyledButton';
import StyledMessage from '@/commons/components/StyledMessage';
import FileUpload from '@/commons/components/FileUpload';
import FileItems from '@/commons/components/FileItems';

const FormBox = styled.form``;

const DefaultForm = ({ form, errors, onChange, onSubmit, onFileDelete }) => {
  const { t } = useTranslation();
  const [editor, setEditor] = useState(null);

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
    <FormBox>
      <dl>
        <dt>{t('제목')}</dt>
        <dd>
          <StyledInput type="text" name="subject" value={form?.subject ?? ''} />
          <StyledMessage variant="danger">{errors?.subject}</StyledMessage>
        </dd>
      </dl>
      <dl>
        <dt>{t('내용')}</dt>
        <dd>
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: {
                items: ['undo', 'redo', '|', 'bold', 'italic'],
              },
              plugins: [
                Bold,
                Essentials,
                Italic,
                Mention,
                Paragraph,
                Undo,
                Image,
                ImageInsert,
              ],
            }}
            data={form?.content ?? ''}
            onReady={(editor) => setEditor(editor)}
            onChange={(_, editor) => {
              onChange({
                target: { name: 'content', value: editor.getData() },
              });
            }}
          />
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
          <StyledMessage variant="danger">
            {errors?.counselingDes}
          </StyledMessage>
        </dd>
      </dl>
    </FormBox>
  );
};

export default React.memo(DefaultForm);
