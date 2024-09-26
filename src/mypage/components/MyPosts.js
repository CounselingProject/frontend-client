'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ListItem from '@/board/components/skins/default/ListItem';

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 2px solid #ddd; /* 상단바와 리스트 구분선 */
  background-color: #f0f0f0; /* 상단바 배경색 */
`;

const ListItems = styled.ul`
  list-style: none; /* 기본 리스트 스타일 제거 */
  padding: 0; /* 패딩 제거 */
  margin: 0; /* 마진 제거 */
`;

const MyPosts = ({ items }) => {
  const { t } = useTranslation();
  return (
    <>
      <ColumnHeader>
        <span style={{ flex: '0 0 100px', textAlign: 'center' }}>
          {t('분류')}
        </span>
        <span style={{ flex: '1', textAlign: 'center' }}>{t('제목')}</span>
        <span style={{ flex: '0 0 100px', textAlign: 'center' }}>
          {t('조회수')}
        </span>
        <span style={{ flex: '0 0 150px', textAlign: 'center' }}>
          {t('등록일')}
        </span>
        <span style={{ flex: '0 0 120px', textAlign: 'center' }}>
          {t('작성자')}
        </span>
        {/* 작성자 추가 */}
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
export default React.memo(MyPosts);
