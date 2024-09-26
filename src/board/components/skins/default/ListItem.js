'use client';
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const Item = ({ item, className }) => {
  const { t } = useTranslation();
  const { seq, subject, poster, viewCount, email, createdAt } = item;
  return (
    <li className={className}>
      <Link href={`/board/view/${seq}`}>{subject}</Link>
      <span className="post-info">
        {poster}
        {email && `(${email})`}
        {viewCount > 0 && t('조회수') + `:${viewCount.toLocaleString()}`}
        {format(createdAt, 'yyyy.MM.dd HH:mm')}
      </span>
    </li>
  );
};

const ListItem = styled(Item)``;

export default React.memo(ListItem);
