import React, { useState, useEffect } from 'react';

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

const LoadEditor = ({ form, onChange, setEditor }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <CKEditor
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
    )
  );
};

export default React.memo(LoadEditor);
