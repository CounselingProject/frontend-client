'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { getUserStates } from '@/commons/contexts/UserInfoContext';
import { getBoard } from '../apis/apiBoard';

import DefaultForm from '../components/skins/default/Form';
import ReviewForm from '../components/skins/review/Form';

import { Instagram } from 'react-content-loader';
import { formatISO } from 'date-fns';

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
    gid: Date.now() + '',
    mode: bid ? 'register' : 'update',
    poster: userInfo?.userName,
    seq,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
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
  }, [bid, setMainTitle, t]);

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onClick = useCallback((name, value) => {
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

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
      onSubmit={onSubmit}
    />
  );
};

export default React.memo(FormContainer);
