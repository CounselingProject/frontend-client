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
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 수직 정렬 */
  margin-bottom: 20px; /* 메뉴바와 리스트 간 간격 */
  gap: 20px; /* 메뉴 항목 간의 간격 */
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid #ddd; /* 상단바와 리스트 구분선 */
  background-color: #f0f0f0; /* 상단바 배경색 */
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin: 20px 0; /* 페이지네이션 간격 */
`;

const DefaultList = ({ items, form, onChange, onSubmit, title }) => {
  const { t } = useTranslation();

  return (
    <>
      <MenuBar>
        <SearchForm form={form} onChange={onChange} onSubmit={onSubmit} />
      </MenuBar>
      <ColumnHeader>
        <span style={{ flex: '0 0 100px', textAlign: 'center' }}>{t('분류')}</span>
        <span style={{ flex: '1', textAlign: 'center' }}>{t('제목')}</span>
        <span style={{ flex: '0 0 100px', textAlign: 'center' }}>{t('조회수')}</span>
        <span style={{ flex: '0 0 150px', textAlign: 'center' }}>{t('등록일')}</span>
        <span style={{ flex: '0 0 120px', textAlign: 'center' }}>{t('작성자')}</span> {/* 작성자 추가 */}
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

      {/* 페이지네이션 섹션 추가 */}
      <Pagination>
        <Link href={`/board/write/${form.bid}`} style={{ textAlign: 'center' }}>
          {t('글쓰기')}
        </Link>
      </Pagination>
    </>
  );
};

export default React.memo(DefaultList);
