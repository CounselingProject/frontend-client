import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { AiFillNotification } from 'react-icons/ai'; // 아이콘 import

const Item = ({ item, className }) => {
  const { t } = useTranslation();
  const { seq, subject, poster, viewCount, createdAt, notice } = item; // notice 속성 사용

  return (
    <li className={className}>
      <span className="category">[{item.category}]</span> {/* 분류 표시 */}
      <span className="subject">
        {notice && <AiFillNotification style={{ marginRight: '5px', color: 'red' }} />} {/* 공지글 아이콘 */}
        <Link href={`/board/view/${seq}`}>{subject}</Link>
      </span>
      <span className="view-count">{viewCount > 0 ? `${t('조회수')}: ${viewCount.toLocaleString()}` : ''}</span>
      <span className="created-at">{format(createdAt, 'yyyy.MM.dd HH:mm')}</span> {/* 등록일 표시 */}
      <span className="poster">{poster || item.email}</span> {/* 작성자 표시 (poster가 없으면 email 사용) */}
    </li>
  );
};

const ListItem = styled(Item)`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin: 5px 0; /* 항목 간 간격 */
  padding: 10px; /* 여백 추가 */
  background-color: #f9f9f9; /* 배경색 추가 */
  border: 1px solid #ddd; /* 테두리 추가 */
  border-radius: 5px; /* 둥근 모서리 */

  .category, .subject, .view-count, .created-at, .poster {
    flex: 1; /* 균등한 비율로 분배 */
    text-align: center; /* 중앙 정렬 */
    white-space: nowrap; /* 줄바꿈 방지 */
  }

  .category {
    font-weight: bold; /* 분류 강조 */
    color: #007bff; /* 색상 변경 */
    margin-right: 10px; /* 분류와 제목 간격 */
    flex: 0 0 100px; /* 고정 너비 */
  }

  .view-count, .created-at, .poster {
    flex: 0 0 150px; /* 고정 너비 */
  }

  .poster {
    flex: 0 0 120px; /* 작성자 열의 고정 너비 */
    color: #333; /* 색상 설정 */
  }
`;

export default React.memo(ListItem);