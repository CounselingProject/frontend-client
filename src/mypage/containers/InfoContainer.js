'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { getMemberInfo } from '@/member/apis/apiInfo';

const InfoContainer = () => {
  const [items, setItems] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const data = await getMemberInfo();
        setItems(data.items);
      } catch (err) {
        console.error(err);
      }
    })();
  },);

  if (!items || items.length === 0) {
    return <h1>로딩....</h1>;
  }

  return (
    <>
      <InfoContainer />
    </>
  );
};

export default React.memo(InfoContainer);
