import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ListItem from './ListItem';

const ListItems = styled.ul``;

const DefaultList = ({ items }) => {
  const { t } = useTranslation();

  return (
    <ListItems>
      {items && items.length > 0 ? (
        items.map((item) => (
          <ListItem key={`board_item_${item.seq}`} item={item} />
        ))
      ) : (
        <li className="no-data">{t('조회된_게시글이_없습니다.')}</li>
      )}
    </ListItems>
  );
};

export default React.memo(DefaultList);
