'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Pagination from '@/commons/components/Pagination';
import { apiList } from '../apis/apiInfo';
import ProgramList from '../components/ProgramList';

const ProgramListContainer = ({ searchParams }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState(searchParams);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState();

  useEffect(() => {
    (async () => {
      try {
        const data = await apiList(search);
        if (data) {
          setItems(data.items);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search]);

  const onPageClick = useCallback((page) => {
    setSearch((search) => ({ ...search, page }));
  }, []);

  if (!items || items.length === 0) {
    return <h1>로딩...</h1>;
  }
  return (
    <>
      <ProgramList items={items} />
      <Pagination pagination={pagination} onClick={onPageClick} />
    </>
  );
};

export default React.memo(ProgramListContainer);