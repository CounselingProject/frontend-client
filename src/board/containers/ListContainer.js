'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { getCommonActions } from '@/commons/contexts/CommonContext';
import { BulletList } from 'react-content-loader';
import { getBoard, getList } from '../apis/apiBoard';
import Pagination from '@/commons/components/Pagination';
import DefaultList from '../components/skins/default/List';
import ReviewList from '../components/skins/review/List';

const MyBulletListLoader = () => <BulletList />;

function getSkin(skin) {
  switch (skin) {
    case 'review':
      return ReviewList;
    default:
      return DefaultList;
  }
}

const ListContainer = ({ params, searchParams }) => {
  const { bid } = params;
  const { setMainTitle } = getCommonActions();

  const [board, setBoard] = useState(null);

  searchParams.page = searchParams.page ?? 1;
  searchParams.bid = bid;
  const [search, setSearch] = useState(searchParams);
  const [form, setForm] = useState(searchParams);
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);

  // 게시판 설정 S
  useEffect(() => {
    (async () => {
      try {
        const board = await getBoard(bid);
        if (board) {
          setBoard(board);
          setMainTitle(board.bname);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [bid, setMainTitle]);
  // 게시판 설정 E

  useEffect(() => {
    (async () => {
      try {
        const data = await getList(bid, search);
        if (data) {
          setItems(data.items);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search, bid]);

  const onPageClick = useCallback((page) => {
    setSearch((search) => ({ ...search, page }));
  }, []);

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      setSearch((search) => ({ ...search, ...form }));
    },
    [form],
  );

  if (!board) {
    return <MyBulletListLoader />;
  }

  const List = getSkin(board.skin);

  return (
    <>
      <List items={items} onSubmit={onSubmit} onChange={onChange} form={form} />
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  );
};

export default React.memo(ListContainer);
