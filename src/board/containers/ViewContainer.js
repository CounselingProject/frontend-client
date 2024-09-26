'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { getInfo } from '../apis/apiBoard';
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

  useEffect(() => {
    (async () => {
      try {
        const item = await getInfo(seq);
        if (item) {
          setItem(item);
          setBoard(board);
          setMainTitle(item.subject);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [seq]);

  if (!item) {
    return <MyInstagramLoader />;
  }

  const View = getSkin(board.skin);

  return <View item={item} />;
};

export default React.memo(ViewContainer);
