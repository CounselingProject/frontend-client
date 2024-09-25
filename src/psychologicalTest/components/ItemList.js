'use client';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ListContainer = styled.ul`
  display: flex; /* 수평 정렬 */
  flex-wrap: wrap; /* 줄 바꿈 허용 */
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  flex: 0 0 18%; /* 각 아이템의 너비를 18%로 설정 (5개가 한 줄에 들어감) */
  box-sizing: border-box; /* 패딩과 마진을 포함한 크기 계산 */
  margin: 1%; /* 리스트 아이템 간 간격 */
  font-weight: bold; /* 글씨 두껍게 */
  padding: 20px; /* 내부 여백 추가 */
  background-color: #dee6ff; /* 배경색 설정 */
  border: 2px solid #dee6ff; /* 테두리 색상 설정 */
  border-radius: 8px; /* 모서리 둥글게 */
  text-align: center; /* 텍스트 중앙 정렬 */
  transition: transform 0.3s; /* 호버 시 애니메이션 효과 */

  &:hover {
    transform: scale(1.05); /* 호버 시 약간 확대 */
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 600px; /* 로딩 영역의 높이 설정 */
  font-size: 20px; /* 글씨 크기 설정 */
  color: #bfc1c7; /* 로딩 텍스트 색상 */
  font-weight: bold; /* 글씨 두껍게 */
`;

const ItemList = ({ items, loading }) => {
  return loading ? (
    <ListContainer className="item-list">
      {items.map((item, i) => (
        <ListItem key={`${item[0]}_${item[1]}_${i}`}>
          <Link href={`/psychologicalTest/${item[0]}`}>{item[1]}</Link>
        </ListItem>
      ))}
    </ListContainer>
  ) : (
    <LoadingContainer>Loading...</LoadingContainer>
  );
};

export default React.memo(ItemList);
