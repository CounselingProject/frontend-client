import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ListItem from './ListItem';
import SearchForm from './SearchForm';
import Link from 'next/link';

const ListItems = styled.ul`
  list-style: none; /* 기본 리스트 스타일 제거 */
  padding: 0; /* 패딩 제거 */
  margin: 0; /* 마진 제거 */
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: space-between; /* 메뉴바 항목 간격 조정 */
  margin-bottom: 20px; /* 메뉴바와 리스트 간 간격 */
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid #ddd; /* 상단바와 리스트 구분선 */
  background-color: #f0f0f0; /* 상단바 배경색 */
`;

const DefaultList = ({ items, form, onChange, onSubmit, title }) => {
  const { t } = useTranslation();

  return (
    <>
      <MenuBar>
        <SearchForm form={form} onChange={onChange} onSubmit={onSubmit} />
        <Link href={`/board/write/${form.bid}`}>{t('글쓰기')}</Link>
      </MenuBar>
      <ColumnHeader>
        <span style={{ flex: '0 0 100px', textAlign: 'center' }}>{t('분류')}</span>
        <span style={{ flex: '1', textAlign: 'center' }}>{t('제목')}</span>
        <span style={{ flex: '0 0 100px', textAlign: 'center' }}>{t('조회수')}</span>
        <span style={{ flex: '0 0 150px', textAlign: 'center' }}>{t('등록일')}</span>
      </ColumnHeader>
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
