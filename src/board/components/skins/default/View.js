'use client';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import Link from 'next/link';

const StyledView = styled.div``;

const DefaultView = ({ item, onDelete }) => {
  const { t } = useTranslation();
  const {
    category,
    seq,
    subject,
    content,
    poster,
    email,
    createdAt,
    viewCount,
    editorView,
    showDelete,
    showEdit,
    showList,
    board,
  } = item;

  return (
    <StyledView>
      <div className="post-info">
        <div className="left">
          {t('작성자')}:{poster}
          {email && `(${email})`}
        </div>
        <div className="right">
          <span>
            {t('조회수')}: {viewCount.toLocaleString()}
          </span>
          <span>
            {t('작성일시')}:{format(createdAt, 'yyyy.MM.dd HH:mm')}
          </span>
        </div>
      </div>
      <div className="subject">
        {category && `[${category}]`}
        {subject}
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: editorView ? content : content.replace(/\n/g, '<br />'),
        }}
      ></div>
      <div className="links">
        <Link href={`/board/write/${board.bid}`}>{t('글쓰기')}</Link>
        {showEdit && <Link href={`/board/update/${seq}`}>{t('글수정')}</Link>}
        {showDelete && (
          <button type="button" onClick={() => onDelete(seq)}>
            {t('글삭제')}
          </button>
        )}
        {showList && (
          <Link href={`/board/list/${board.bid}`}>{t('글목록')}</Link>
        )}
      </div>
    </StyledView>
  );
};

export default React.memo(DefaultView);
