'use client';
import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import MyPosts from '../components/MyPosts';
import { getMyList } from '@/board/apis/apiBoard';
import Pagination from '@/commons/components/Pagination';

import { BulletList } from 'react-content-loader';

const MyBulletListLoader = () => <BulletList />;

const BoardContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const { setMainTitle } = getCommonActions();
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);
  searchParams.page = searchParams?.page ?? 1;
  const [search, setSearch] = useState(searchParams);
  useLayoutEffect(() => {
    setMainTitle(t('내가_작성한_게시글'));
  }, [setMainTitle, t]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyList(search);
        if (data) {
          setItems(data.items);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search]);

  const onPageClick = useCallback((page) => {
    setSearch((search) => ({ ...search, page }));
  }, []);

  return (
    <>
      <MyPosts items={items} />
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  );
};

export default React.memo(BoardContainer);
