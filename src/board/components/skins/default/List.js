import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ListItem from './ListItem';
import SearchForm from './SearchForm';
import Link from 'next/link';

const ListItems = styled.ul``;

const DefaultList = ({ items, form, onChange, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <>
      <SearchForm form={form} onChange={onChange} onSubmit={onSubmit} />
      <Link href={`/board/write/${form.bid}`}>{t('글쓰기')}</Link>
      <ListItems>
        {items && items.length > 0 ? (
          items.map((item) => (
            <ListItem key={`board_item_${item.seq}`} item={item} />
          ))
        ) : (
          <li className="no-data">{t('조회된_게시글이_없습니다.')}</li>
        )}
      </ListItems>
    </>
  );
};

export default React.memo(DefaultList);
