import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ListItem from './ListItem';
import SearchForm from './SearchForm';
import Link from 'next/link';
import { StyledButton } from '@/commons/components/buttons/StyledButton'; // StyledButton 임포트

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
  background-color: #005d4f; /* 상단바 배경색 */
  color: white; /* 글자 색상 */
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  margin: 20px 0; /* 페이지네이션 간격 */
`;

const NoDataMessage = styled.li`
  text-align: center; /* 중앙 정렬 */
  padding: 20px; /* 패딩 추가 */
  color: #999; /* 색상 설정 */
`;

const DefaultList = ({ items, form, onChange, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <>
      <MenuBar>
        <SearchForm form={form} onChange={onChange} onSubmit={onSubmit} />
      </MenuBar>
      <ColumnHeader>
        <span style={{ flex: '0 0 100px', textAlign: 'center', marginLeft: '5px' }}>{t('분류')}</span> {/* 5px 간격 추가 */}
        <span style={{ flex: '1', textAlign: 'center' }}>{t('제목')}</span>
        <span style={{ flex: '0 0 100px', textAlign: 'center' }}>{t('조회수')}</span>
        <span style={{ flex: '0 0 150px', textAlign: 'center' }}>{t('등록일')}</span>
        <span style={{ flex: '0 0 120px', textAlign: 'center' }}>{t('작성자')}</span>
      </ColumnHeader>
      <ListItems>
        {items && items.length > 0 ? (
          items.map((item) => (
            <ListItem key={`board_item_${item.seq}`} item={item} />
          ))
        ) : (
          <NoDataMessage>{t('조회된_게시글이_없습니다.')}</NoDataMessage>
        )}
      </ListItems>

      {/* 글쓰기 버튼 추가 */}
      <Pagination>
        <Link href={`/board/write/${form.bid}`} style={{ textAlign: 'center' }}>
          <StyledButton type="button" variant="green">
            {t('글쓰기')}
          </StyledButton>
        </Link>
      </Pagination>
    </>
  );
};

export default React.memo(DefaultList);
