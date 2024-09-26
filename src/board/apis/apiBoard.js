import requestData from '@/commons/libs/requestData';
import saveProcess from '@/commons/libs/saveProcess';

// 게시판 설정
export const getBoard = (bid) => requestData(`/board/config/${bid}`);

// 게시글 등록
export const write = (form) =>
  saveProcess(`/board/write/${form.bid}`, 'POST', form);

// 게시글 수정
export const update = (form) =>
  saveProcess(`/board/update/${form.seq}`, 'PATCH', form);

// 게시글 삭제
export const deleteData = (seq) =>
  requestData(`/board/delete/${seq}`, 'DELETE');

// 게시글 조회
export const getInfo = (seq) => requestData(`/board/info/${seq}`);

// 게시글 목록
export const getList = (bid, search) => {
  search = search ?? {};
  let qs = Object.entries(search)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  qs = qs ? `?${qs}` : qs;

  const url = `/board/list/${bid}${qs}`;

  return requestData(url);
};

// 내가 쓴 게시글 조회
export const getMyList = (search) => {
  search = search ?? {};
  let qs = Object.entries(search)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  qs = qs ? `?${qs}` : qs;

  const url = `/board/mylist${qs}`;

  return requestData(url);
};
