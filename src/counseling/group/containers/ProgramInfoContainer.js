// 'use client';
// import React, { useEffect, useState, useCallback } from 'react';
// import { apiList } from '../apis/apiInfo';
// import Pagination from '@/commons/components/Pagination';
// import ProgramInfo from '../components/ProgramInfo';
// import ProgramList from '../components/ProgramList';

// const ProgramInfoContainer = () => {
//   const [programList, setProgramList] = useState([]);
//   const [pagination, setPagination] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedProgram, setSelectedProgram] = useState(null);

//   useEffect(() => {
//     const fetchProgramList = async () => {
//       try {
//         setLoading(true);

//         const data = await apiList(search);
//         setProgramList(data.items);
//         setPagination(data.pagination);
//       } catch (err) {
//         console.error('오류!!!!!!!!!!!', err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProgramList();
//   }, [page]);

//   const onPageClick = useCallback((newPage) => {
//     setPage(newPage);
//   }, []);

//   const handleClick = (item) => {
//     setSelectedProgram(item);
//     setModalOpen(true); // 모달 열기
//   };

//   const closeModal = () => {
//     setModalOpen(false); // 모달 닫기
//     setSelectedProgram(null);
//   };

//   if (loading) {
//     return <h1>로딩 중...</h1>;
//   }

//   if (error) {
//     return <h1>오류 발생: {error.message}</h1>;
//   }

//   return (
//     <>
//       <ProgramList
//         programList={items}
//         loading={loading}
//         error={error}
//         onClick={handleClick}
//       />
//       <Pagination pagination={pagination} onClick={onPageClick} />

//       <ProgramInfo item={selectedProgram} />
//     </>
//   );
// };

// export default React.memo(ProgramInfoContainer);
