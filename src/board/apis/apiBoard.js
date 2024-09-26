import requestData from '@/commons/libs/requestData';
import saveProcess from '@/commons/libs/saveProcess';

// 게시판 설정
export const getBoard = (bid) => requestData(`/board/config/${bid}`);
