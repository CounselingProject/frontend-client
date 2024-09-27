'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { getInfo, deleteData } from '../apis/apiBoard';
import DefaultView from '../components/skins/default/View';
import ReviewView from '../components/skins/review/View';
import { Instagram } from 'react-content-loader';
const MyInstagramLoader = () => <Instagram />;

function getSkin(skin) {
  switch (skin) {
    case 'review':
      return ReviewView;
    default:
      return DefaultView;
  }
}

const ViewContainer = ({ params }) => {
  const { seq } = params;
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();
  const [item, setItem] = useState(null);
  const [board, setBoard] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const item = await getInfo(seq);
        if (item) {
          setItem(item);
          setBoard(item.board);
          setMainTitle(item.subject);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [seq]);

  const onDelete = useCallback(
    (seq) => {
      if (!confirm(t('정말_삭제하겠습니까'))) {
        return;
      }

      (async () => {
        try {
          await deleteData(seq);

          router.replace(`/board/list/${board.bid}`);
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [board],
  );

  if (!item || !board) {
    return <MyInstagramLoader />;
  }

  const View = getSkin(board.skin);

  return <View item={item} onDelete={onDelete} />;
};

export default React.memo(ViewContainer);
