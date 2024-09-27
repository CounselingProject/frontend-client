'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { getUserStates } from '@/commons/contexts/UserInfoContext';
import { getBoard, write, update, getInfo } from '../apis/apiBoard';

import DefaultForm from '../components/skins/default/Form';
import ReviewForm from '../components/skins/review/Form';

import { Instagram } from 'react-content-loader';

const MyInstagramLoader = () => <Instagram />;

function getSkin(skin) {
  switch (skin) {
    case 'review':
      return ReviewForm;
    default:
      return DefaultForm;
  }
}

const FormContainer = ({ params }) => {
  const bid = params?.bid;
  const seq = params?.seq;

  const { setMainTitle } = getCommonActions();
  const { userInfo } = getUserStates();
  const { t } = useTranslation();
  const [board, setBoard] = useState(null);
  const [form, setForm] = useState({
    bid,
    gid: Date.now() + '',
    mode: bid ? 'register' : 'update',
    poster: userInfo?.userName,
    seq,
  });
  const [errors, setErrors] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (seq) {
      // 글 수정 - 게시글 정보
      (async () => {
        try {
          const data = await getInfo(seq);
          if (data) {
            setForm((form) => ({ ...form, ...data, mode: 'update' }));
            setBoard(data.board);
            setMainTitle(data.subject);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }

    if (bid) {
      // 게시글 작성
      (async () => {
        try {
          const board = await getBoard(bid);
          if (board) {
            setBoard(board);
            setMainTitle(`${board.bname} ${t('글쓰기')}`);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [bid, setMainTitle, t, seq, form.bid]);

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onClick = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      /* 유효성 검사 S */
      const _errors = {};
      let hasErrors = false;
      const requiredFields = {
        subject: t('제목을_입력하세요'),
        poster: t('작성자를_입력하세요'),
        content: t('내용을_입력하세요'),
      };

      for (const [field, message] of Object.entries(requiredFields)) {
        if (!form[field] || !form[field].trim()) {
          _errors[field] = _errors[field] ?? [];
          _errors[field].push(message);
          hasErrors = true;
        }
      }
      /* 유효성 검사 E */
      setErrors(_errors);
      if (hasErrors) {
        return;
      }

      // 등록 또는 수정 처리
      (async () => {
        try {
          const boardData =
            form?.mode === 'update' ? await update(form) : await write(form);

          const redirectUrl =
            board?.locationAfterWriting === 'view'
              ? `/board/view/${boardData.seq}`
              : `/board/list/${board.bid}`;

          router.replace(redirectUrl);
        } catch (err) {
          const message = err.message;

          setErrors(
            typeof message === 'string' ? { global: [message] } : message,
          );

          console.error(err);
        }
      })();
    },
    [t, form, router, board],
  );

  if (!board) {
    return <MyInstagramLoader />;
  }

  const { skin } = board;

  const Form = getSkin(skin);

  return (
    <Form
      board={board}
      form={form}
      errors={errors}
      onChange={onChange}
      onClick={onClick}
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(FormContainer);
